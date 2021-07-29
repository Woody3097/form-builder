import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { selectPreview } from "./Store/Main/Preview/main.selector";
import { authDataState, mainState, previewState } from "./shared/interfaces";
import { LOGIN_URL, REGISTER_URL, UPDATE_URL } from "./shared/consts";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {
  private _registerUrl = REGISTER_URL;
  private _loginUrl = LOGIN_URL;
  private _updateUrl = UPDATE_URL;
  preview$!: Subscription;

  currentPreview!: previewState;

  constructor(private http: HttpClient, private _router: Router, private store: Store<mainState>) {
     this.preview$ = this.store.select(selectPreview).subscribe(res => {
      this.currentPreview = res;
    })
  }

  ngOnInit(): void {}

  loginUser(user: authDataState): Observable<authDataState> {
    return this.http.post<any>(this._loginUrl, user);
  }

  registerUser(user: authDataState): Observable<authDataState> {
    return this.http.post<any>(this._registerUrl, user);
  }

  updateUser(user: authDataState): Observable<authDataState> {
    return this.http.put<any>(this._updateUrl, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logOut(): void {
    this.save();
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this._router.navigate(['/login']);
  }

  save(): void {
    this.updateUser({email: <string>localStorage.getItem('email'), token: <string>localStorage.getItem('token'), previewArr: this.currentPreview}).
    subscribe(res => res);
  }

  ngOnDestroy(): void {
    this.preview$.unsubscribe();
  }
}
