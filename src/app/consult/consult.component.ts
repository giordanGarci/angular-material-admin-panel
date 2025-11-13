import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../client.service';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '../register/client';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consult',
  imports: [MatInputModule, MatCardModule, FlexLayoutModule, MatIconModule, FormsModule, MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.scss'
})
export class ConsultComponent implements OnInit {

  nameToSearch: string = "";
  clients: Client[] = [];
  displayedColumns = ['name', 'email', 'cpf', 'birthDate', 'uf', 'municipio', 'actions'];
  snackBar = inject(MatSnackBar);

  constructor(
    private clientService: ClientService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.clients = this.clientService.getClients("")
  }

  getClients(): void {
    this.clients = this.clientService.getClients(this.nameToSearch);
  }

  prepareEdit(clientId: string): void {
    this.router.navigate(['/register'], {queryParams: {"id": clientId}});
  }

  prepareDelete(client: Client): void {
    client.isDeleting = true;
  }

  deleteClient(clientId: string): void {
    this.clientService.deleteClient(clientId);
    this.getClients();
    this.showMessage("Cliente deletado com sucesso!");
  }

  showMessage(message: string) {
    this.snackBar.open(message, "OK", { duration: 3000 });
  }

}
