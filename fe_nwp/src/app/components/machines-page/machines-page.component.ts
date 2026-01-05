import { Component } from '@angular/core';
import {Machine, ScheduledOperation} from "../../model";
import {MachineService} from "../../services/machine.service";
import { Modal } from 'bootstrap';
import {MachineSocketService} from "../../services/machine-socket.service";
import {ScheduleService} from "../../services/schedule.service";
import {AuthService} from "../../services/auth.service";
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

  constructor(private machineService: MachineService,
              private machineSocketService: MachineSocketService,
              private scheduleService: ScheduleService,
              private authService: AuthService) {}
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

  states = ['RUNNING', 'STOPPED', 'CRASHED', 'RESTARTING', 'TURNING_OFF', 'TURNING_ON'];


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


    // Get the actual User object from your token
    const user$ = this.authService.getUserFromToken();
    if (!user$) return; // user not logged in?

    const dateTime = new Date(this.selectedDateTime);
    const cron = this.toCron(dateTime);

    user$.subscribe(user => {
      if (!user) return; // handle null user

      // Prepare the ScheduledOperation object
      const op: ScheduledOperation = {
        machine: this.selectedVm!,
        operation: this.selectedOperation!,
        status: 'PENDING',
        cron: cron,            // optional, fill if you use cron
        createdBy: user
      };

      // Call backend to save it
      this.scheduleService.createSchedule(op).subscribe({
        next: createdOp => {
          console.log('Scheduled operation saved to backend:', createdOp);

          // initialize array if none exists
          if (!this.scheduledTasks[this.selectedVm!.machineId]) {
            this.scheduledTasks[this.selectedVm!.machineId] = [];
          }

          // add to local array for UI display
          this.scheduledTasks[this.selectedVm!.machineId].push({
            operation: this.selectedOperation,
            dateTime: this.selectedDateTime
          });

          this.scheduleModal.hide();
        },
        error: err => console.error('Failed to schedule operation', err)
      });
    });
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

  toCron(date: Date): string {
    const minute = date.getMinutes();
    const hour = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1; // JS months are 0-based

    return `0 ${minute} ${hour} ${day} ${month} ?`;
  }
}
