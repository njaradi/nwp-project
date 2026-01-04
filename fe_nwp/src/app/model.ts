export interface Machine {
  machineId: number;
  name: string;
  state: string;
  createdAt: Date;
  user: User;
  active: boolean;
  // todo: Masina kao entitet sadrzi sledece atribute:
  //  ID, stanje (slobodna/zauzeta), napravioJe (id korisnika), aktivna (true/false)
}


export interface User {
  userId: number;
  username: string;
  email: string;
  role: string;
  password: string;
  // todo: pri kreiranju korisnika potrebno je popuniti i koje (sve) dozvole ima
  //  novi korisnik, jesmo li to mislili sa ovim role? ili ostavljamo za kasnije?
}

export interface Error {
  id: number;
  machineName: string,
  date: string;
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

