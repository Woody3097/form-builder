import { elementState } from "./interfaces";

export const clearedStyles = {
  backgroundColor: '',
  color: '',
  width: '',
  height: '',
  fontSize: ''
}

export const clearedEl : elementState = {
  id: 0,
  name: 'Input',
  value: '',
  type: 'input',
  options: [],
  styles : clearedStyles
}

export const elementListStartValue: Array<elementState> = [
  {
    id: 0,
    name: 'Input',
    value: '',
    type: 'input',
    options: [],
    styles : { ...clearedStyles, backgroundColor: 'rgba(0,0,0,.04)' }
  },
  {
    id: 1,
    name: 'Select',
    value: '',
    type: 'select',
    options: [],
    styles : { ...clearedStyles, backgroundColor: 'rgba(0,0,0,.04)' }
  },
  {
    id: 2,
    name: 'TextArea',
    value: '',
    type: 'textarea',
    options: [],
    styles : { ...clearedStyles, backgroundColor: 'rgba(0,0,0,.04)' }
  },
  {
    id: 3,
    name: 'CheckBox',
    value: '',
    type: 'checkbox',
    options: [],
    styles: { ...clearedStyles, backgroundColor: 'rgba(0,0,0,.04)' }
  },
  {
    id: 4,
    name: 'Button',
    value: '',
    type: 'button',
    options: [],
    styles : { ...clearedStyles, backgroundColor: 'purple' }
  }
]

export const REGISTER_URL = "http://localhost:3000/api/register"
export const LOGIN_URL = "http://localhost:3000/api/login"
export const UPDATE_URL = "http://localhost:3000/api/update"

