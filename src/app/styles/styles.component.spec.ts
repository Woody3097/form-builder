import {StylesComponent} from "./styles.component";
import {Store} from "@ngrx/store";
import {mainState} from "../shared/interfaces";

describe('Test styles component', () => {
  const store = new Store<mainState>(null!, null!, null!)
  const component = new StylesComponent(store)

  component.ngOnInit()
  component.styles.fontSize = '25px'
  component.validateStyleValues()

  it('FontSize is 25px, should transform to 14px', () => {
    expect(component.styles.fontSize).toBe('14px')
  })
})
