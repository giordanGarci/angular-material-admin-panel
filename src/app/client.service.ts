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

  private getStorage() : Client[] {
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

  getClients(name: string): Client[] {
    const clients = this.getStorage();
    if (!name) {
      return clients;
    }
    return clients.filter(c => c.name?.toLowerCase().includes(name.toLowerCase()));
  }

  getClientById(id: string): Client {
    const clients = this.getStorage();
    return clients.find(c => c.id === id) || Client.newClient();
  }

  edit(client: Client) {
    const clients = this.getStorage();
    const clientIndex = clients.findIndex(c => c.id === client.id);
    if (clientIndex > -1) {
      clients[clientIndex] = client;
      localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(clients));
    }
  }

  deleteClient(clientId: string) {
    const clients = this.getStorage();
    const clientIndex = clients.findIndex(c => c.id === clientId);
    if (clientIndex > -1) {
      clients.splice(clientIndex, 1);
      localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(clients));
    }
  }
}
