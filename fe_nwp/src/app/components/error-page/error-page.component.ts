import { Component } from '@angular/core';

interface Error {
  id: number;
  machineName: string,
  date: string;
  operation: string;
  message: string;
}
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {
  errors: Error[] = [
    {
      id: 1,
      machineName: "Machine-A1",
      date: new Date("2025-10-25T08:30:00").toLocaleDateString(),
      operation: "turn on",
      message: "Failed to start due to low power supply."
    },
    {
      id: 2,
      machineName: "Machine-B3",
      date: new Date("2025-10-25T09:15:00").toLocaleDateString(),
      operation: "turn off",
      message: "Unexpected shutdown caused by overheating."
    },
    {
      id: 3,
      machineName: "Machine-C2",
      date: new Date("2025-10-25T10:45:00").toLocaleDateString(),
      operation: "restart",
      message: "Restart failed: configuration file missing."
    },
    {
      id: 4,
      machineName: "Machine-D5",
      date: new Date("2025-10-25T11:20:00").toLocaleDateString(),
      operation: "create",
      message: "Creation process interrupted by network error."
    },
    {
      id: 5,
      machineName: "Machine-E7",
      date: new Date("2025-10-25T12:00:00").toLocaleDateString(),
      operation: "destroy",
      message: "Destruction command aborted: insufficient privileges."
    }
  ];
}
