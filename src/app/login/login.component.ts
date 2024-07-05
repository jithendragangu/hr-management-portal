import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  submitLogin() {
    this.appService.login(this.loginForm.value).subscribe((response) => {
      if (response.status == 200 || response.status == 201) {
        // console.log(response.body);
        this.appService.saveEmployee(response.body);
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid Credentials');
      }
    });
  }
}
