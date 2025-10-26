import { Component } from '@angular/core';
import {VmCard} from "../../model";


@Component({
  selector: 'app-machines-page',
  templateUrl: './machines-page.component.html',
  styleUrls: ['./machines-page.component.css']
})
export class MachinesPageComponent {
  vmList: VmCard[] = [
      { id: 1, name: 'VM Alpha', state: 'Running', date: '2025-10-20' },
      { id: 2, name: 'VM Beta', state: 'Stopped', date: '2025-10-22' },
      { id: 3, name: 'VM Gamma', state: 'Crashed', date: '2025-10-23' },
      { id: 4, name: 'VM Delta', state: 'Restoring', date: '2025-10-24' },
      { id: 5, name: 'VM Epsilon', state: 'Running', date: '2025-10-25' },
    ];
    nextId = 6;

    nameInput = '';
    stateInput = '';
    dateFromInput = '';
    dateToInput = '';

    states = ['Running', 'Stopped', 'Crashed', 'Restarting'];

    filterMachines(){

    }
    // addVm() {
    //   if (!this.nameInput || !this.stateInput || !this.dateInput) return;
    //   this.vmList.push({
    //     id: this.nextId++,
    //     name: this.nameInput,
    //     state: this.stateInput,
    //     date: this.dateInput
    //   });
    //   this.nameInput = '';
    //   this.stateInput = '';
    //   this.dateInput = '';
    // }

    deleteVm(id: number) {
      this.vmList = this.vmList.filter(vm => vm.id !== id);
    }

    shutdown(vm: VmCard) {
      vm.state = 'Stopped';
    }

    restart(vm: VmCard) {
      vm.state = 'Restarting';
      setTimeout(() => vm.state = 'Running', 2000);
    }
}
