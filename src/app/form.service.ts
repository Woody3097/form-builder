import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public count$ = new Subject<Object>();

  public addToForm(val: Object) {
    this.count$.next(val);
  }
  public deleteFromForm(val: Object) {
    this.count$.next(val);
  }
}
