import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, copyArrayItem, moveItemInArray} from "@angular/cdk/drag-drop";
import {clearedStyles, elementState, mainState} from "../Store/Main/Preview/main.reducer";
import {Store} from "@ngrx/store";
import {addPreviewEl, clearStyles, deletePreviewEl} from "../Store/Main/Preview/main.action";
import {FormService} from "../form.service";

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  elements: Array<elementState> = [
    {id: 0,name: 'Input',value: '',  type: 'input', styles : {...clearedStyles, backgroundColor: 'rgba(0,0,0,.04)'}},
    {id: 1,name: 'Select', value: '', type: 'select', styles : {...clearedStyles, backgroundColor: 'rgba(0,0,0,.04)'}},
    {id: 2,name: 'TextArea', value: '', type: 'textarea', styles : {...clearedStyles, backgroundColor: 'rgba(0,0,0,.04)'}},
    {id: 3,name: 'CheckBox', value: '', type: 'checkbox', styles: {...clearedStyles, backgroundColor: 'rgba(0,0,0,.04)'}},
    {id: 4,name: 'Button', value: '', type: 'button', styles : {...clearedStyles, backgroundColor: 'purple'}}
  ]
  preview: Array<elementState> = []

  constructor(private store: Store<mainState>, private formService: FormService) {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any>, check: boolean) {
    if(event.previousContainer !== event.container) {
      if (check) {
        let tmp = Object.assign({},event.previousContainer.data[event.previousIndex])
        tmp.id = Date.now()
        event.previousContainer.data[event.previousIndex] = tmp
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        this.store.dispatch(addPreviewEl({el: event.previousContainer.data[event.previousIndex]}))
        this.formService.addToForm({id : event.previousContainer.data[event.previousIndex].id, action : 'add'})
        this.store.dispatch(clearStyles())
      } else {
        this.formService.deleteFromForm({id : event.previousContainer.data[event.previousIndex].id, action : 'del'})
        this.store.dispatch(deletePreviewEl({id : event.previousContainer.data[event.previousIndex].id}))
        event.previousContainer.data.splice(event.previousIndex, 1)
        this.store.dispatch(clearStyles())
      }
    }
    else{
      if(check){
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }
    }
  }

  sortPredicate(index: number, item: CdkDrag<number>){
    return (index + 1) % 2 === item.data % 2
  }

}
