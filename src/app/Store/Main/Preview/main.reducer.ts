import { createReducer, on } from "@ngrx/store";
import {
  addPreviewEl,
  changePreviewEl,
  clearStyles,
  deletePreviewEl,
  setOptions,
  setPreview,
  setStyles
} from "./main.action";
import { clearedEl } from "../../../shared/consts";
import { elementState, mainState } from "../../../shared/interfaces";

export const initialState: mainState = {
  preview: [],
  styles: clearedEl
};

export const mainReducer = createReducer(
  initialState,
  on(addPreviewEl, (state, { el }) => {
    let tmp = state.preview.concat();
    let el_ = Object.assign({}, el);
    el_.name += Date.now().toString();
    tmp.push(el_);
    return ({ ...state, preview: tmp });
  }),
  on(deletePreviewEl, (state, { id }) => {
    let tmp = state.preview.concat();
    tmp = tmp.filter((el: elementState) => el.id !== id);
    return ({ ...state, preview: tmp });
  }),
  on(changePreviewEl, (state, { style ,id }) => {
    let tmp = state.preview.slice();
    let i = tmp.findIndex((el: elementState) => el.id === id);
    tmp[i] = { ...tmp[i], styles: style };
    return { ...state, preview: tmp };
  }),
  on(setStyles, (state, { obj }) => ({ ...state, styles: obj })),
  on(clearStyles, state => ({...state, styles : clearedEl})),
  on(setPreview, (state, { previewArr }) => {
    return ({ ...state, preview: previewArr });
  }),
  on(setOptions, (state, { options, id }) => {
    let tmp = state.preview.slice();
    let i = tmp.findIndex((el: elementState) => el.id === id);
    tmp[i] = { ...tmp[i], options: options };
    return { ...state, preview: tmp };
  })
);
