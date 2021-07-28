import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Store } from "@ngrx/store";
import { setStyles } from "../Store/Main/Preview/main.action";
import { clearedEl } from "../shared/consts";
import { elementState, mainState, previewState, styleInterface } from "../shared/interfaces";

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
  value!: any;

  constructor(private store: Store<mainState>) {}

  ngOnInit(): void {
    this.style = this.el.styles;
  }

  setNewStyles(): void {
    this.store.dispatch(setStyles({ obj: this.el }));
  }

  onChange = (value: any) => {}
  writeValue(val: string): void {
    this.value = val
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
  }
}

