import { Component, OnInit } from "@angular/core";
import { CdkDrag, CdkDragDrop, copyArrayItem, moveItemInArray } from "@angular/cdk/drag-drop";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { addPreviewEl, clearStyles, deletePreviewEl } from "src/app/Store/Main/Preview/main.action";
import { selectPreview } from "src/app/Store/Main/Preview/main.selector";
import { FormService } from "src/app/shared/services/form.service";
import { elementListStartValue } from "src/app/shared/consts";
import { elementState, mainState } from "src/app/shared/interfaces";


@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {
  preview$!: Observable<any>;
  elements: Array<elementState> = elementListStartValue;

  constructor(private store: Store<mainState>, private formService: FormService) {}

  ngOnInit(): void {
    this.preview$ = this.store.select(selectPreview);
  }

  previewActive(): boolean {
    return true;
  }

  elementListActive(): boolean {
    return false;
  }

  onDropAdd(event: CdkDragDrop<any>): void {
    this.store.dispatch(addPreviewEl({el: event.previousContainer.data[event.previousIndex]}));
    this.formService.addToForm({id : event.previousContainer.data[event.previousIndex].id, action : 'add'});
    this.store.dispatch(clearStyles());
  }

  onDropDel(event: CdkDragDrop<any>): void {
    this.formService.deleteFromForm({id : event.previousContainer.data[event.previousIndex].id, action : 'del'});
    this.store.dispatch(deletePreviewEl({id : event.previousContainer.data[event.previousIndex].id}));
    event.previousContainer.data.splice(event.previousIndex, 1);
    this.store.dispatch(clearStyles());
  }

  drop(event: CdkDragDrop<any>, check: boolean): void {
    if(event.previousContainer !== event.container) {
      if (check) {
        let tmp = Object.assign({},event.previousContainer.data[event.previousIndex]);
        tmp.id = Date.now();
        event.previousContainer.data[event.previousIndex] = tmp;
        copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        this.onDropAdd(event);
      }
      else {
        this.onDropDel(event);
      }
    }
    else{
      if (check) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }
    }
  }

  sortPredicate(index: number, item: CdkDrag<number>): boolean {
    return (index + 1) % 2 === item.data % 2;
  }
}
