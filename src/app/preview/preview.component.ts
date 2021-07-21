import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {mainState} from "../Store/Main/Preview/main.reducer";
import {Store} from "@ngrx/store";
import {FormService} from "../form.service";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  @Input() elements: Array<any> = []
  @Input() preview: Array<any> = []

  form!: FormGroup;


  constructor(private fb: FormBuilder, private store: Store<mainState>, private formService: FormService){

    this.form = this.fb.group({})
    formService.count$.subscribe((res: any) => {
      if(res.action === 'add')this.form.addControl(res.id.toString(), new FormControl(''))
      if(res.action === 'del')this.form.removeControl(res.id.toString())
    })
  }

  ngOnInit(){

  }
}
