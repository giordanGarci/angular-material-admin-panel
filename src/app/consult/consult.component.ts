import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ClientService } from '../client.service';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '../register/client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consult',
  imports: [MatInputModule, MatCardModule, FlexLayoutModule, MatIconModule, FormsModule, MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.scss'
})
export class ConsultComponent implements OnInit {

  clients: Client[] = [];
  displayedColumns = ['name', 'email', 'cpf', 'birthDate'];

  constructor(
    private clientService: ClientService
  ){}

  getClients(name: string): Client[] {
    return this.clientService.getClients(name);
  }

  ngOnInit(): void {
    this.clients = this.getClients("");
  }

}
