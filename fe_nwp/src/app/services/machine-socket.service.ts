import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';

import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MachineSocketService {
  private client: Client;
  private machineUpdates$ = new Subject<any>();

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {},
      debug: str => console.log(str),
      reconnectDelay: 5000,

    });

    this.client.onConnect = () => {
      this.client.subscribe('/topic/machines', (msg: Message) => {
        this.machineUpdates$.next(JSON.parse(msg.body));
      });
    };

    this.client.activate();
  }

  onMachineUpdates(): Observable<any> {
    return this.machineUpdates$.asObservable();
  }

  turnOn(id: number) {
    this.client.publish({
      destination: `/app/machines/${id}/on`,
      body: ''
    });
  }

  turnOff(id: number) {
    this.client.publish({
      destination: `/app/machines/${id}/off`,
      body: ''
    });
  }

  restart(id: number) {
    this.client.publish({
      destination: `/app/machines/${id}/restart`,
      body: ''
    });
  }
}
