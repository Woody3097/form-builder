import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {BuilderComponent} from "./builder.component";
import {Store} from "@ngrx/store";
import {FormService} from "../form.service";
import {AppModule} from "../app.module";


describe('Builder Component',  () => {
  let component: BuilderComponent
  let fixture: ComponentFixture<BuilderComponent>
  beforeEach( async (() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [FormService, Store]
    })
      .compileComponents()
      .then(()=>{
      fixture = TestBed.createComponent(BuilderComponent)
      component = fixture.componentInstance})

 }))
  it('should be created',() => {
    expect(component).toBeTruthy()
  })
})

