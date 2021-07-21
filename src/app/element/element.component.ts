import {Component, ElementRef, forwardRef, HostBinding, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {clearedStyles, elementState, mainState, styleInterface} from "../Store/Main/Preview/main.reducer";
import {Store} from "@ngrx/store";
import {setStyles} from "../Store/Main/Preview/main.action";
import {selectPreview} from "../Store/Main/Preview/main.selector";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css'],

})
export class ElementComponent implements OnInit {

  @Input() type: string = ''
  @Input() check: boolean = false
  @Input() el: elementState = {id: 0, name: '', value: '', type: '', styles: clearedStyles}
  currentValue: any
  style: styleInterface = this.el.styles

  @Input()
  forms!: FormGroup;

  constructor(private store : Store<mainState>) {

  }

  ngOnInit(): void {
    this.store.select(selectPreview).subscribe(res => {
      res.map(el => {
        if(el.id === this.el.id) {
          this.style = el.styles
          this.el = el
        }
      })
    })
  }

  setNewStyles(){
    this.store.dispatch(setStyles({obj : this.el}))
  }

  Submit(){
    for (let key in this.forms.value){
      this.forms.value[key] ? console.log(this.forms.value[key]) : null
    }
  }
}
