import {v4 as uuid} from 'uuid';

export class Client {
  id?: string;
  name?: string;
  email?: string;
  cpf?: string;
  birthDate?: string;
  isDeleting?: boolean;
  uf?: string;
  municipio?: string;

  static newClient(){
    const client = new Client();
    client.id = uuid();
    return client;
  }

}
