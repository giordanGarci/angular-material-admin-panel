import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ConsultComponent } from './consult/consult.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'consult',
    component: ConsultComponent
  }

];
