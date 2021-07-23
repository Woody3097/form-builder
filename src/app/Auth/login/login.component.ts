import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {setPreview} from "../../Store/Main/Preview/main.action";
import {Store} from "@ngrx/store";
import {mainState} from "../../Store/Main/Preview/main.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentError: string = ''

  constructor(private _auth: AuthService, private _router: Router, private store: Store<mainState>) {
  }


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);


  passwordFormControl = new FormControl('')

  loginData: any = {
    password: '',
    email: '',
    previewArr: []
  }

  getLoginData() {
    this.loginData.password = this.passwordFormControl.value
    this.loginData.email = this.emailFormControl.value
    this._auth.loginUser(this.loginData).subscribe(
      res => {
        console.log(res)
        this.store.dispatch(setPreview(res.previewArr))
        localStorage.setItem('token', res.token)
        localStorage.setItem('email', res.email)
        this._router.navigate(['/app'])
      },
      err => {
        this.currentError = err.error
      }
    )
  }


  ngOnInit(): void {
  }
}
