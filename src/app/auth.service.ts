import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectPreview } from "./Store/Main/Preview/main.selector";
import { authDataState, mainState, previewState } from "./shared/interfaces";
import { LOGIN_URL, REGISTER_URL, UPDATE_URL } from "./shared/consts";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private _registerUrl = REGISTER_URL;
  private _loginUrl = LOGIN_URL;
  private _updateUrl = UPDATE_URL;

  currentPreview: previewState | undefined;

  constructor(private http: HttpClient, private _router: Router, private store: Store<mainState>) {
    this.store.select(selectPreview).subscribe(res => {
      this.currentPreview = res;
    })
  }

  ngOnInit(): void {}

  loginUser(user: authDataState): Observable<any> {
    return this.http.post<any>(this._loginUrl, user);
  }

  registerUser(user: authDataState): Observable<any> {
    return this.http.post<any>(this._registerUrl, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(this._updateUrl, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logOut(): void {
    this.updateUser({ email: localStorage.getItem('email'), token: localStorage.getItem('token'), previewArr: this.currentPreview}).
      subscribe(res => res);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this._router.navigate(['/login']);
  }

  save(): void{
    this.updateUser({email: localStorage.getItem('email'), token: localStorage.getItem('token'), previewArr: this.currentPreview}).
    subscribe(res => res);
  }
}
