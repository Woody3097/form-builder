import { Component, OnInit } from "@angular/core";
import { AbstractControl,  FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { first } from "rxjs/operators";

import { AuthService } from "src/app/shared/services/auth.service";
import { setPreview } from "src/app/Store/Main/Preview/main.action";
import { authDataState, mainState } from "../../shared/interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentError: string | undefined;
  form!: FormGroup;

  loginData: authDataState = {
    password: '',
    email: '',
    token: '',
    previewArr: []
  };

  constructor(private _auth: AuthService, private _router: Router, private store: Store<mainState>) {}

  ngOnInit(): void {
    this.currentError = '';
    this.form = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      passwordFormControl: new FormControl('')
    })
  };

  public get emailControl(): AbstractControl {
    return <AbstractControl>this.form.get('emailFormControl');
  };

  public get passwordControl(): AbstractControl {
    return <AbstractControl>this.form.get('passwordFormControl');
  };

  getLoginData(): void {
    this.loginData.password = this.passwordControl.value;
    this.loginData.email = this.emailControl.value;
    this._auth.loginUser(this.loginData)
      .pipe(first())
      .subscribe(
      res => {
        this.store.dispatch(setPreview({ previewArr: res.previewArr }));
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.email);
        this._router.navigate(['/app']);
      },
      err => {
        this.currentError = err.error;
      }
    )
  };
}
