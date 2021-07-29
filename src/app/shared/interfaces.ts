export interface authDataState {
  password?: string,
  email: string,
  token: string,
  previewArr: previewState
}

export interface FormServiceElState {
  id: number,
  action: string
}

export interface mainState {
  preview: previewState,
  styles: elementState
}
export type previewState = Array<elementState>

export interface elementState  {
  id: number,
  name: string,
  value: string,
  type: string,
  options: [],
  styles: styleInterface
}

export interface styleInterface {
  backgroundColor: string,
  color: string,
  width: string,
  height: string,
  fontSize: string
}
