import { LoginComponent } from "./login.component";

describe('Test login component', () => {
  const component = new LoginComponent(null!, null!, null!);

  component.ngOnInit();

  it('CurrentError is empty at ngOnInit', () => {
    expect(component.currentError).toBe('')
  })

})
