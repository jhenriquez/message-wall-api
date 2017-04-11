import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { ApplicationShellComponent } from '../components/applicationShell.component';
import { PublishMessageComponent }   from '../components/publishMessage.component';
import { WallMessageComponent }      from '../components/wallMessage.component';
import { NoMessagesComponent }       from '../components/noMessages.component';
import { LoadingComponent }          from '../components/loading.component';
import { NoUserComponent }           from '../components/noUser.component';
import { MessageService }            from '../services/message.service';
import { UserService }               from '../services/user.service';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule ],
  declarations: [
    ApplicationShellComponent,
    NoUserComponent,
    PublishMessageComponent,
    LoadingComponent,
    WallMessageComponent,
    NoMessagesComponent
  ],
  providers: [ UserService, MessageService ],
  bootstrap: [ ApplicationShellComponent ]
})
export class ThoughtWallModule { }