import {createReducer, on} from "@ngrx/store";
import {addPreviewEl, changePreviewEl, clearStyles, deletePreviewEl, setStyles} from "./main.action";


export interface mainState {
  preview: previewState,
  styles: elementState
}
export type previewState = Array<elementState>

export interface elementState  {
  id: number,name: string, value: string, type: string, styles : styleInterface
}

export const clearedStyles = {
  backgroundColor: '',
  color: '',
  width: '',
  height: '',
  fontSize: ''
}

export const initialState: mainState = {
  preview: [],
  styles: {id: 0, name: '',value: '', type: '', styles: clearedStyles}
}
export interface styleInterface {
  backgroundColor: string,
  color: string,
  width: string,
  height: string,
  fontSize: string
}

export const mainReducer = createReducer(
  initialState,
  on(addPreviewEl, (state, {el}) => {
    let tmp = state.preview.concat()
    let el_ = Object.assign({}, el)
    el_.name += Date.now().toString()
    tmp.push(el_)
    return ({...state, preview: tmp})
  }),
  on(deletePreviewEl, (state, {id}) => {
    let tmp = state.preview.concat()
    tmp = tmp.filter(el => el.id !== id)
    return ({...state, preview: tmp})
  }),
  on(changePreviewEl, (state, {style ,id}) => {
    let tmp = state.preview.slice()
    let i = tmp.findIndex((el) => el.id === id)
    tmp[i] = {...tmp[i], styles: style}

    return {...state, preview: tmp}
  }),
  on(setStyles, (state, {obj}) => ({...state, styles: obj})),
  on(clearStyles, state => ({...state, styles : {id: 0, name: '', value: '', type: '', styles: clearedStyles} }))
)
