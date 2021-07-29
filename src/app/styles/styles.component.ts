import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { selectStyles } from "../Store/Main/Preview/main.selector";
import { changePreviewEl, setOptions, setStyles } from "../Store/Main/Preview/main.action";
import { clearedEl, clearedStyles } from "../shared/consts";
import { elementState, mainState, styleInterface } from "../shared/interfaces";

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.css']
})
export class StylesComponent implements OnInit, OnDestroy {
  styles!: styleInterface;
  checkStyles!: boolean;
  currentObj!: elementState;
  optionAdd!: string;
  optionDel!: string;
  styles$!: Subscription
  @Input() currentId!: number;

  constructor(private store: Store<mainState>) { }

  ngOnInit(): void {
    this.styles = clearedStyles;
    this.checkStyles = false;
    this.currentObj = clearedEl;
    this.optionAdd = '';
    this.optionDel = '';
    this.styles$ = this.store.select(selectStyles).subscribe((res: elementState) => {
      this.currentObj = Object.assign({}, res);
      this.currentId = this.currentObj.id;
      this.styles = Object.assign({}, res.styles);
      this.checkStyles = res.styles.backgroundColor !== '';
    })
  }

  validateStyleValues(): void {
    if(parseInt(this.styles.fontSize) > 20 || parseInt(this.styles.fontSize) < 5) {
      this.styles.fontSize = '14px';
    }
  }

  changeStyles(): void {
    this.validateStyleValues();
    this.currentObj.styles = this.styles;
    this.store.dispatch(changePreviewEl({ style: Object.assign({}, this.styles), id: this.currentId }));
    this.store.dispatch(setStyles({ obj: this.currentObj }));
  }

  delOption(): void {
    let newOptions: any = this.currentObj.options.filter(el => el !== this.optionDel);
    this.store.dispatch(setOptions({ options: newOptions, id: this.currentId }));
    this.optionDel = '';
  }

  addOption(): void {
    let newOptions : any = this.currentObj.options.concat();
    newOptions.push(this.optionAdd);
    this.store.dispatch(setOptions({ options: newOptions, id: this.currentId }));
    this.optionAdd = '';
  }

  ngOnDestroy(): void {
    this.styles$.unsubscribe();
  }
}
