import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';
import {LaddaModule} from 'angular2-ladda';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {LoginComponent} from './login.component';

@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    ReactiveFormsModule,
    LaddaModule.forRoot({
      style: "expand-left",
      spinnerSize: 40,
      spinnerColor: "white",
      spinnerLines: 12
    }),
  ],
  declarations: [LoginComponent],
  providers: [AuthenticationService]
})
export class LoginModule { }
