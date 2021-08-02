import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";

import { selectPreview } from "src/app/Store/Main/Preview/main.selector";
import { FormService } from "src/app/shared/services/form.service";
import { elementState, FormServiceElState, mainState } from "src/app/shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit, OnDestroy {
  @Input() elements!: Array<elementState>;
  @Input() preview!: Array<elementState>;
  form!: FormGroup;
  formService$!: Subscription;

  constructor(private fb: FormBuilder, private store: Store<mainState>, private formService: FormService){
    this.formService$ = formService.count$.subscribe((res: FormServiceElState) => {
      switch (res.action) {
        case 'add':
          this.form.addControl(res.id.toString(), new FormControl(''));
          break;
        case 'del':
          this.form.removeControl(res.id.toString());
          break;
      }
    })
    this.form = this.fb.group({});
    store.select(selectPreview).subscribe(res => {
      this.preview = res;
    })
    this.preview.map((el: elementState) => {
      this.formService.addToForm({ id : el.id, action : 'add' });
    })
  }

  ngOnInit(): void {
    this.submitForm = this.submitForm.bind(this, this.form);
  }

  submitForm(form: FormGroup): void {
    let arr = Object.entries(form.controls);
    this.preview.map((el: any) => {
     let tmp = arr.find((el1) => {
        return el1[0] == el.id;
      })
      if (tmp) {
        console.log(el.type, tmp[1].value);
      }
    })
  }

  ngOnDestroy(): void {
    this.formService$.unsubscribe();
  }
}
