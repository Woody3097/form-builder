import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { FormServiceElState } from "../interfaces";

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public count$ = new Subject<FormServiceElState>();

  public addToForm(val: FormServiceElState): void {
    this.count$.next(val);
  }
  public deleteFromForm(val: FormServiceElState): void {
    this.count$.next(val);
  }
}
