import { Component } from '@angular/core';
import {Machine} from "../../model";
import {MachineService} from "../../services/machine.service";
import { Modal } from 'bootstrap';
//todo: schedule stuff

@Component({
  selector: 'app-machines-page',
  templateUrl: './machines-page.component.html',
  styleUrls: ['./machines-page.component.css']
})
export class MachinesPageComponent {
  vmList: Machine[] = [];

  scheduledTasks: { [vmId: number]: { operation: string; dateTime: string }[] } = {};
  //scheduling
  selectedVm: Machine | null = null;
  selectedOperation: string = '';
  selectedDateTime: string = '';
  operations = ['Turn on', 'Shut down', 'Restart'];
  scheduleModal: any;

  constructor(private machineService: MachineService) {}
  ngOnInit(): void {
    this.machineService.machines.subscribe((machines) => {
      this.vmList = machines.filter(vm => vm.active);
    });

    setTimeout(() => {
      const modalEl = document.getElementById('scheduleModal');
      if (modalEl) {
        this.scheduleModal = new Modal(modalEl);
      }
    });
  }

  openScheduleModal(vm: Machine) {
    this.selectedVm = vm;
    this.selectedOperation = '';
    this.selectedDateTime = '';
    this.scheduleModal.show();
  }

  scheduleOperation() {
    if (!this.selectedVm || !this.selectedOperation || !this.selectedDateTime) return;

    //initialize array if none exists
    if (!this.scheduledTasks[this.selectedVm.id]) {
      this.scheduledTasks[this.selectedVm.id] = [];
    }

    //add new task
    const task = {
      operation: this.selectedOperation,
      dateTime: this.selectedDateTime
    };
    this.scheduledTasks[this.selectedVm.id].push(task);

    console.log(`Scheduled ${this.selectedOperation} for ${this.selectedVm.name} at ${this.selectedDateTime}`);

    // Here you could save to backend, or trigger a local timeout for testing:
    const delay = new Date(this.selectedDateTime).getTime() - Date.now();
    if (delay > 0) {
      setTimeout(() => {
        if (this.selectedOperation === 'Turn on') this.turnon(this.selectedVm!);
        else if (this.selectedOperation === 'Shut down') this.shutdown(this.selectedVm!);
        else if (this.selectedOperation === 'Restart') this.restart(this.selectedVm!);

        // Remove the task from the scheduledTasks so label disappears
        this.scheduledTasks[this.selectedVm!.id] = this.scheduledTasks[this.selectedVm!.id].filter(
          t => t !== task
        );
      }, delay);
    }else{
      //if in the past then get rid of task
      this.scheduledTasks[this.selectedVm.id] = this.scheduledTasks[this.selectedVm.id].filter(
        t => t !== task
      );
    }

    this.scheduleModal.hide();
  }

     // Filters
    filterName = '';
    filterState = '';
    filterDateFrom = '';
    filterDateTo = '';

    // Add new VM popup
    showAddForm = false;
    newVmName = '';

    states = ['Running', 'Stopped', 'Crashed', 'Restarting', 'Turning off', 'Turning on'];

      get filteredVmList(): Machine[] {
        return this.vmList.filter(vm => {
              const matchesName =
                !this.filterName || vm.name.toLowerCase().includes(this.filterName.toLowerCase());
              const matchesState = !this.filterState || vm.state === this.filterState;
              const matchesDateFrom = !this.filterDateFrom || vm.date >= this.filterDateFrom;
              const matchesDateTo = !this.filterDateTo || vm.date <= this.filterDateTo;
              return matchesName && matchesState && matchesDateFrom && matchesDateTo;
            });
      }

    addVm() {
      this.machineService.createMachine(this.newVmName);
    }

    deleteVm(id: number) {
      this.machineService.deleteMachine(id);
    }

    shutdown(vm: Machine) {
      //maybe have timeout, inform user that it is in the process of turning off
      vm.state = 'Turning off';
      this.machineService.updateMachineState(vm,"Stopped");
    }

    turnon(vm: Machine){
      vm.state = 'Turning on'
      this.machineService.updateMachineState(vm,"Running");
    }

    //this should be turn on
    restart(vm: Machine) {
      vm.state = 'Restarting';
      this.machineService.updateMachineState(vm,"Running");
    }

  isRunning(vm:Machine) {
    return vm.state === 'Running' || vm.state === 'Crashed';
  }

  isStopped(vm:Machine) {
    return vm.state === 'Stopped';
  }
}
