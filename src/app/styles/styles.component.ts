import {Component, Input, OnInit} from '@angular/core';
import {clearedStyles, elementState, mainState, styleInterface} from "../Store/Main/Preview/main.reducer";
import {Store} from "@ngrx/store";
import {selectStyles} from "../Store/Main/Preview/main.selector";
import {changePreviewEl, setStyles} from "../Store/Main/Preview/main.action";

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.css']
})
export class StylesComponent implements OnInit {

  styles: styleInterface = clearedStyles
  checkStyles: boolean = false
  currentObj: elementState = {id: 0, name: '',value: '', type: '', styles: clearedStyles}
  @Input() currentId: number = 0;

  constructor(private store: Store<mainState>) {

  }


  ngOnInit(): void {
    this.store.select(selectStyles).subscribe((res: any) => {
      this.currentObj = Object.assign({}, res)
      this.currentId = this.currentObj.id
      this.styles = Object.assign({}, res.styles)
      this.checkStyles = res.styles.backgroundColor !== ""
    })
  }
  changeStyles(){
    this.currentObj.styles = this.styles
    this.store.dispatch(changePreviewEl({style: Object.assign({}, this.styles), id: this.currentId}))
    this.store.dispatch(setStyles({obj: this.currentObj}))
  }

}
