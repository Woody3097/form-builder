import { createFeatureSelector, createSelector } from "@ngrx/store";

import { mainState } from "../../../shared/interfaces";

export const getMainState = createFeatureSelector<mainState>('main');

export const selectPreview = createSelector(
  getMainState,
  (state) => state.preview
);

export const selectStyles = createSelector(
  getMainState,
  (state) => state.styles
);
