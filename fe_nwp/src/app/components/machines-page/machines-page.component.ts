import { Component } from '@angular/core';
import {VmCard} from "../../model";


@Component({
  selector: 'app-machines-page',
  templateUrl: './machines-page.component.html',
  styleUrls: ['./machines-page.component.css']
})
export class MachinesPageComponent {
  //TODO: make this list make sense, maybe put it in local storage
  vmList: VmCard[] = [
      { id: 1, name: 'VM Alpha', state: 'Running', date: '2025-10-20' },
      { id: 2, name: 'VM Beta', state: 'Stopped', date: '2025-10-22' },
      { id: 3, name: 'VM Gamma', state: 'Crashed', date: '2025-10-23' },
      { id: 4, name: 'VM Delta', state: 'Restarting', date: '2025-10-24' },
      { id: 5, name: 'VM Epsilon', state: 'Running', date: '2025-10-25' },
    ];
    nextId = 6;

     // Filters
    filterName = '';
    filterState = '';
    filterDateFrom = '';
    filterDateTo = '';

    // Add new VM popup
    showAddForm = false;
    newVmName = '';

    states = ['Running', 'Stopped', 'Crashed', 'Restarting', 'Turning off', 'Turning on'];

      get filteredVmList(): VmCard[] {
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
      if (!this.newVmName.trim()) return;
          this.vmList.push({
            id: this.nextId++,
            name: this.newVmName.trim(),
            state: 'Stopped',
            date: new Date().toISOString().slice(0, 10)
          });
          this.newVmName = '';
          this.showAddForm = false;
    }

    cancelAdd() {
      this.newVmName = '';
      this.showAddForm = false;
    }

    deleteVm(id: number) {
      this.vmList = this.vmList.filter(vm => vm.id !== id);
    }

    shutdown(vm: VmCard) {
      //maybe have timeout, inform user that it is in the process of turning off
      vm.state = 'Turning off'
      setTimeout(() => vm.state = 'Stopped', 2000)
    }

    turnon(vm: VmCard){
      vm.state = 'Turning on'
      setTimeout(() => vm.state = 'Running', 2000)
    }

    //this should be turn on
    restart(vm: VmCard) {
      vm.state = 'Restarting';
      setTimeout(() => vm.state = 'Running', 2000);
    }
}
