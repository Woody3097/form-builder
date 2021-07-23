import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(private _auth: AuthService, private _router: Router) {
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('')

  registerData: any = {
    password: '',
    email: '',
    previewArr: []
  }

  getRegisterData() {
    this.registerData.password = this.passwordFormControl.value
    this.registerData.email = this.emailFormControl.value
    this.registerData.previewArr = []
    this._auth.registerUser(this.registerData).
    subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        localStorage.setItem('email', res.email)
        this._router.navigate(['/app'])
      },
      err => console.log(err)
    )
  }
}
