import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Machine} from "../model";

@Injectable({
  providedIn: 'root'
})
export class MachineService{
  // BehaviorSubject holds the current list of machines and emits new values whenever updated
  private machinesSubject = new BehaviorSubject<Machine[]>([]);

  // Observable for components to subscribe to (read-only)
  machines: Observable<Machine[]> = this.machinesSubject.asObservable();

  constructor() {
    // Optional: preload with some fake machines for testing
    this.machinesSubject.next([
      { id: 1, name: 'VM Alpha', state: 'Running', date: '2025-10-20', author: "Admin", active: true },
      { id: 2, name: 'VM Beta', state: 'Stopped', date: '2025-10-22', author: "Alice", active: true },
      { id: 3, name: 'VM Gamma', state: 'Crashed', date: '2025-10-23',author: "Bob", active: true },
      { id: 4, name: 'VM Delta', state: 'Restarting', date: '2025-10-24', author: "Admin", active: true },
      { id: 5, name: 'VM Epsilon', state: 'Running', date: '2025-10-25', author: "Admin", active: true },
    ]);
  }

  getMachineById(id: number): Machine | undefined {
    const currentMachines = this.machinesSubject.value;
    return currentMachines.find(machine => machine.id === id);
  }

  updateMachine(updatedMachine: Machine){
    const currentMachines = this.machinesSubject.value;

    const updatedList = currentMachines.map(machine =>
      machine.id === updatedMachine.id ? updatedMachine : machine
    );

    this.machinesSubject.next(updatedList);
  }


  updateMachineState(updatedMachine: Machine,state: string){

    const delay = 10000 + Math.random() * 2000;

    setTimeout(() => {

      const currentMachines = this.machinesSubject.value;

      const updatedList = currentMachines.map(machine =>
        machine.id === updatedMachine.id
          ? {...machine, state} // copy old machine, change state
          : machine
      );

      this.machinesSubject.next(updatedList);
    }, delay);
  }

  createMachine(machineName: string){
    const currentMachines = this.machinesSubject.value;

    const newMachine: Machine = {
      id: currentMachines.length+1, // or however you generate IDs
      name: machineName,
      state: 'Stopped', // default state
      date: new Date().toISOString().slice(0, 10),
      author: "Admin",//todo: current user
      active: true
    };

    const updatedList = [...currentMachines, newMachine];
    this.machinesSubject.next(updatedList);
  }
  deleteMachine(id: number){
    const currentMachines = this.machinesSubject.value.map(machine =>
      machine.id === id ? { ...machine, active: false } : machine
    );

    this.machinesSubject.next(currentMachines);
  }
}
