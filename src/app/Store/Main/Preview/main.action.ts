import {createAction, props} from "@ngrx/store";
import {elementState, styleInterface} from "./main.reducer";

export const addPreviewEl = createAction('[Main] addPreview', props<{ el : elementState }>())
export const deletePreviewEl = createAction('[Main] deletePreview', props<{id: number }>())
export const changePreviewEl = createAction('[Main] changePreview', props<{style: styleInterface, id: number}>())

export const setStyles = createAction('[Main] setStyles', props<{obj : elementState}>())
export const clearStyles = createAction('[Main] clearStyles')
