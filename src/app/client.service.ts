import { Injectable } from '@angular/core';
import { Client } from './register/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  static REPO_CLIENTS = "_CLIENTS";

  constructor() { }

  addClient(client: Client) {
    const storage = this.getStorage();

    const existClient = storage.find(c => c.cpf === client.cpf);
    if(existClient){
      return alert("Já existe um cliente cadastrado com esse CPF!");
    }

    storage.push(client);
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage));
  }

  getStorage() : Client[] {
    const respositoryClients = localStorage.getItem(ClientService.REPO_CLIENTS);
    if(respositoryClients){
      const clients: Client[] = JSON.parse(respositoryClients);
      return clients;
    }

    return this.createStorageClients();
  }

  private createStorageClients(){
    const clients: Client[] = [];
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(clients));
    return clients;
  }


}
