import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Store } from "@ngrx/store";

import { setStyles } from "src/app/Store/Main/Preview/main.action";
import { clearedEl } from "src/app/shared/consts";
import { elementState, mainState, previewState, styleInterface } from "src/app/shared/interfaces";

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ElementComponent),
    multi: true
  }]
})
export class ElementComponent implements OnInit, ControlValueAccessor {
  @Input() type!: string;
  @Input() check!: boolean;
  @Input() el: elementState = clearedEl;
  @Input() submit!: any;
  currentValue!: string;
  style!: styleInterface;
  state: previewState | undefined;
  value!: string;

  constructor(private store: Store<mainState>) { }

  ngOnInit(): void {
    this.style = this.el.styles;
  }

  setNewStyles(): void {
    this.store.dispatch(setStyles({ obj: this.el }));
  }

  previewActive(): boolean {
    return true;
  }

  elementListActive(): boolean {
    return false;
  }

  onChange = (value: any) => { }

  writeValue(val: string): void {
    this.value = val
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
  }
}

