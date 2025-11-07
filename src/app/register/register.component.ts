import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Client } from'./client';
import { ClientService } from '../client.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  client: Client = Client.newClient();
  editing: boolean = false;

  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute, private router: Router) {}

  saveClient() {
    if (!this.editing){
      this.clientService.addClient(this.client);
      this.client = Client.newClient();
    }else{
      this.clientService.edit(this.client);
      this.router.navigate(['/consult']);
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        let foundClient = this.clientService.getClientById(params['id']);
        if (foundClient) {
          this.client = foundClient;
          this.editing = true;
        }
      }
    });
    console.log(this.client);
  }

}
