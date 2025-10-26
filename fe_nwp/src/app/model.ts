export interface VmCard {
  id: number;
  name: string;
  state: string;
  date: string;
}


export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Error {
  id: number;
  machineName: string,
  date: string;
  operation: string;
  message: string;
}
