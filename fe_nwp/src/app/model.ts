export interface Machine {
  machineId: number;
  name: string;
  state: string;
  created_at: Date;
  user: User;
  active: boolean;
}

export interface User {
  userId: number;
  username: string;
  email: string;
  role: string;
  password: string;
}

export interface ErrorMessage {
  errorId: number;
  machine: Machine,
  timestamp: string;
  operation: string;
  message: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  token: string;
}

export interface ScheduledOperation {
  scheduledId?: number;
  machine: Machine;
  operation: string;
  status: string;
  cron: string;
  createdBy: User;
}

