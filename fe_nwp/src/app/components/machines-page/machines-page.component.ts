import { Component } from '@angular/core';
import {Machine} from "../../model";
import {MachineService} from "../../services/machine.service";


@Component({
  selector: 'app-machines-page',
  templateUrl: './machines-page.component.html',
  styleUrls: ['./machines-page.component.css']
})
export class MachinesPageComponent {
  //TODO: make this list make sense, maybe put it in local storage
  vmList: Machine[] = [];

  constructor(private machineService: MachineService) {}
  ngOnInit(): void {
    this.machineService.machines.subscribe((machines) => {
      this.vmList = machines.filter(vm => vm.active);
    })
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
