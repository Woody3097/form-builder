import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { first } from "rxjs/operators";

import { AuthService } from "src/app/shared/services/auth.service";
import { setPreview } from "src/app/Store/Main/Preview/main.action";
import { authDataState, mainState } from "src/app/shared/interfaces";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  registerData: authDataState = {
    token: '',
    password: '',
    email: '',
    previewArr: []
  };

  constructor(private _auth: AuthService, private _router: Router, private store: Store<mainState>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ])
    });
  };

  public get emailControl(): AbstractControl {
    return <AbstractControl>this.form.get('emailFormControl');
  };
  public get passwordControl(): AbstractControl {
    return <AbstractControl>this.form.get('passwordFormControl');
  };

  getRegisterData(): void {
    this.registerData.password = this.passwordControl?.value;
    this.registerData.email = this.emailControl?.value;
    if(this.passwordControl?.errors || this.emailControl?.errors){
      return;
    }
    this.registerData.previewArr = [];
    this._auth.registerUser(this.registerData)
      .pipe(first())
      .subscribe(
      res => {
        this.store.dispatch(setPreview({previewArr: []}));
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.email);
        this._router.navigate(['/app']);
      },
      err => console.log(err)
    );
  };
}
