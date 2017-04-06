import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApplicationShellComponent } from './components/applicationShell.component';
import { NoUserComponent }     from "./components/noUser.component";

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    ApplicationShellComponent,
    NoUserComponent
  ],
  bootstrap: [ ApplicationShellComponent ]
})
export class ThoughtWallModule { }