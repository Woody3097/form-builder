import { Component, Input, OnInit } from "@angular/core";

import { elementState } from "../shared/interfaces";

@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.component.html',
  styleUrls: ['./elements-list.component.css']
})
export class ElementsListComponent implements OnInit {

  @Input() elements!: Array<elementState>;
  @Input() preview!: Array<elementState>;

  constructor() {}

  ngOnInit(): void {}
}
