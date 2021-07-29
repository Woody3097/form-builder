import { RegisterComponent } from "./register.component";

describe('Test register component', () => {
  const component = new RegisterComponent(null!, null!, null!);

  component.ngOnInit();

  it('Form has controls at ngOnInit', () => {
    expect(component.form.controls).toBeDefined();
  });



  it('Control should return an Abstract control', () => {
    expect(component.emailControl).toBeDefined()
  })
})



