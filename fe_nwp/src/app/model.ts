export interface VmCard {
  id: number;
  name: string;
  state: string;
  date: string;
  // todo: Masina kao entitet sadrzi sledece atribute:
  //  ID, stanje (slobodna/zauzeta), napravioJe (id korisnika), aktivna (true/false)
}


export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
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
