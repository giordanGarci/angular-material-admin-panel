import { Component, ViewChild, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Client } from'./client';
import { ClientService } from '../client.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BrasilapiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.model';


@Component({
  selector: 'app-register',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('clientForm') clientForm: any;

  client: Client = Client.newClient();
  editing: boolean = false;
  snackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private clientService: ClientService,
    private brasilapiService: BrasilapiService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  loadUFs() {
    this.brasilapiService.getEstados().subscribe({
      next:  estados => this.estados = estados,
      error: error => console.log(error)
    });
  }

  loadMunicipios(event: MatSelectChange) {
    const estado =  event.value;
    this.brasilapiService.getMunicipios(estado).subscribe({
        next:  municipios => this.municipios = municipios,
        error: error => console.log(error)
      }
    );
  }

  saveClient() {
    if (!this.editing){
      this.clientService.addClient(this.client);
      this.client = Client.newClient();
      this.showMessage("Cliente cadastrado com sucesso!");
    }else{
      this.clientService.edit(this.client);
      this.router.navigate(['/consult']);

    }
  }

  clearForm() {
    this.client = Client.newClient();
    this.clientForm.resetForm();
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
    this.loadUFs();
    if (this.client.uf) {
        const event = {value: this.client.uf};
        this.loadMunicipios(event as MatSelectChange);
      }
  }

  showMessage(message: string) {
    this.snackBar.open(message, "OK", { duration: 3000 });
  }

}
