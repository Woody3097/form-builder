import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectPreview} from "../Store/Main/Preview/main.selector";
import {mainState} from "../Store/Main/Preview/main.reducer";


@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.component.html',
  styleUrls: ['./elements-list.component.css']
})

export class ElementsListComponent implements OnInit {

  @Input() elements: Array<any> = []
  @Input() preview: Array<any> = []

  constructor(private store: Store<mainState>) {
    this.store.select(selectPreview).subscribe(res => {
    })
  }

  ngOnInit(): void {
  }
}
