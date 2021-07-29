import {ElementComponent} from "./element.component";

describe('Test element component', () => {
  const component = new ElementComponent(null!)

  component.ngOnInit();

  it('Style not null at ngOnInit', () => {
    expect(component.style).toBeDefined()
  })

  it('PreviewActive return true', () => {
    expect(component.previewActive()).toBeTruthy()
  })
})
