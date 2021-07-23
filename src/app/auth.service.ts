import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {mainState, previewState} from "./Store/Main/Preview/main.reducer";
import {Store} from "@ngrx/store";
import {selectPreview} from "./Store/Main/Preview/main.selector";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  private _updateUrl = "http://localhost:3000/api/update"

  currentPreview: previewState | undefined

  constructor(private http: HttpClient, private _router: Router, private store: Store<mainState>) {
  }

  ngOnInit() {
  }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user)
  }

  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user)
  }

  updateUser(user: any){
    return this.http.put<any>(this._updateUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logOut() {
    this.store.select(selectPreview).subscribe(res => {
      console.log(res)
      this.currentPreview = res
    })
    this.updateUser({email: localStorage.getItem('email'), token: localStorage.getItem('token'), previewArr: this.currentPreview}).
      subscribe(res => console.log(res))
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    this._router.navigate(['/login'])
  }
}
