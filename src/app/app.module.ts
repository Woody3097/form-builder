import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule} from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { StylesComponent } from "./styles/styles.component";
import { BuilderComponent } from "./builder/builder.component";
import { PreviewComponent } from "./preview/preview.component";
import { ElementsListComponent } from "./elements-list/elements-list.component";
import { ElementComponent } from "./element/element.component";
import { environment } from "../environments/environment";
import { mainReducer } from "./Store/Main/Preview/main.reducer";
import { AuthService} from "./auth.service";
import { RegisterComponent } from "./Auth/register/register.component";
import { LoginComponent } from "./Auth/login/login.component";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveComponentModule } from "@ngrx/component";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StylesComponent,
    BuilderComponent,
    PreviewComponent,
    ElementComponent,
    ElementsListComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    NoopAnimationsModule,
    DragDropModule,
    StoreModule.forRoot({main: mainReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveComponentModule
],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
