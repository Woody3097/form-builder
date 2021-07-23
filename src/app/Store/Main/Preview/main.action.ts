import {createAction, props} from "@ngrx/store";
import {elementState, mainState, previewState, styleInterface} from "./main.reducer";

export const addPreviewEl = createAction('[Main] addPreviewEl', props<{ el : elementState }>())
export const deletePreviewEl = createAction('[Main] deletePreviewEl', props<{id: number }>())
export const changePreviewEl = createAction('[Main] changePreviewEl', props<{style: styleInterface, id: number}>())
export const setPreview = createAction('[Main] setPreview', props<{previewArr: previewState}>())

export const setStyles = createAction('[Main] setStyles', props<{obj : elementState}>())
export const clearStyles = createAction('[Main] clearStyles')
