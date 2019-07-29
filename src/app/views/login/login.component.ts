import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AlertConfig } from 'ngx-bootstrap/alert';
import {AuthenticationService} from '../../services/auth/authentication.service';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  alert: any = {
    type: 'danger',
    dismissible: true
  };
  error: string = '';

  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    this.isLoading = true;

    this.auth.login(username, password).subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(['dashboard']);
      },
      (error) =>{
        this.error = error;
        this.isLoading = false;
      });
  }

  createForm() {

    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  }

  dismiss(){
    this.error = "";
  }
}
