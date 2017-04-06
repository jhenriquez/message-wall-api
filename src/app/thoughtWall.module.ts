import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ApplicationShellComponent } from './components/applicationShell.component';
import { PublishMessageComponent }   from "./components/publishMessage.component";
import { WallMessageComponent }      from "./components/wallMessage.component";
import { NoUserComponent }           from "./components/noUser.component";
import { LoadingComponent } from "./components/loading.component";


@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [
    ApplicationShellComponent,
    NoUserComponent,
    PublishMessageComponent,
    LoadingComponent,
    WallMessageComponent
  ],
  bootstrap: [ ApplicationShellComponent ]
})
export class ThoughtWallModule { }