import { Component } from '@angular/core';
import {Machine} from "../../model";
import {MachineService} from "../../services/machine.service";
import { Modal } from 'bootstrap';
import {MachineSocketService} from "../../services/machine-socket.service";
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
  operations = ['ON', 'OFF', 'RESTART'];
  scheduleModal: any;

  constructor(private machineService: MachineService, private machineSocketService: MachineSocketService) {}
  ngOnInit(): void {
    this.loadMachines();
    this.machineSocketService.onMachineUpdates().subscribe(machine => {
      console.log('Machine updated:', machine);
      this.loadMachines();
    });



    setTimeout(() => {
      const modalEl = document.getElementById('scheduleModal');
      if (modalEl) {
        this.scheduleModal = new Modal(modalEl);
      }
    });
  }

  // Filters
  filterName = '';
  filterState = '';
  filterDateFrom = '';
  filterDateTo = '';

  // Add new VM popup
  showAddForm = false;
  newVmName = '';

  states = ['RUNNING', 'STOPPED', 'CRASHED', 'RESTARTING', 'TURNING_OFF', 'TURNNNING_ON'];


  loadMachines(): void {
    this.machineService.filterMyMachines(
      this.filterName,
      this.filterState,
      this.filterDateFrom,
      this.filterDateTo
    ).subscribe(machines => {
      this.vmList = machines;
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
    if (!this.scheduledTasks[this.selectedVm.machineId]) {
      this.scheduledTasks[this.selectedVm.machineId] = [];
    }

    //add new task
    const task = {
      operation: this.selectedOperation,
      dateTime: this.selectedDateTime
    };
    this.scheduledTasks[this.selectedVm.machineId].push(task);

    console.log(`Scheduled ${this.selectedOperation} for ${this.selectedVm.name} at ${this.selectedDateTime}`);

    // Here you could save to backend, or trigger a local timeout for testing:
    const delay = new Date(this.selectedDateTime).getTime() - Date.now();
    if (delay > 0) {
      setTimeout(() => {
        if (this.selectedOperation === 'ON') this.turnon(this.selectedVm!);
        else if (this.selectedOperation === 'OFF') this.shutdown(this.selectedVm!);
        else if (this.selectedOperation === 'RESTART') this.restart(this.selectedVm!);

        // Remove the task from the scheduledTasks so label disappears
        this.scheduledTasks[this.selectedVm!.machineId] = this.scheduledTasks[this.selectedVm!.machineId].filter(
          t => t !== task
        );
      }, delay);
    }else{
      //if in the past then get rmachineId of task
      this.scheduledTasks[this.selectedVm.machineId] = this.scheduledTasks[this.selectedVm.machineId].filter(
        t => t !== task
      );
    }

    this.scheduleModal.hide();
  }




  addVm() {
    console.log("addVm fun")
    this.machineService.createMachine(this.newVmName).subscribe({
      next: () => this.loadMachines(),
      error: err => console.error(err)
    });
  }

  deleteVm(id: number) {
    this.machineService.deleteMachine(id).subscribe({
      next: () => this.loadMachines(),
      error: err => console.error('Delete failed', err)
    });
  }


  shutdown(vm: Machine) {
    vm.state = 'TURNING_OFF';
      this.machineSocketService.turnOff(vm.machineId);
    }

    turnon(vm: Machine){
      vm.state = 'TURNING_ON';
      this.machineSocketService.turnOn(vm.machineId);
    }

    //this should be turn on
    restart(vm: Machine) {
      vm.state = 'RESTARTING';
      this.machineSocketService.restart(vm.machineId);
    }

  isRunning(vm:Machine) {
    return vm.state === 'RUNNING' || vm.state === 'CRASHED';
  }

  isStopped(vm:Machine) {
    return vm.state === 'STOPPED';
  }
}
