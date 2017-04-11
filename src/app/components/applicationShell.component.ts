import { Component, OnInit } from '@angular/core';

import { WallMessage }       from '../models/WallMessage';
import { UserService }       from '../services/user.service';
import { MessageService }    from '../services/message.service';
import { User }              from '../models/User';
import { ApplicationShellObservableService } from '../services/applicationShellObservable.service';

@Component({
  selector: 'application-shell',
  templateUrl: '/components/applicationShell.tpl.html',
  providers: [ ApplicationShellObservableService ]
})
export class ApplicationShellComponent implements OnInit {

    constructor (
      private userService: UserService,
      private messageService: MessageService,
      private observables: ApplicationShellObservableService
    ) { }

    private canPublishMessages = false;
    private isLoadingUser = true;
    private noUser = false;
    private isLoadingMessages = true;

    messages: WallMessage[] = [];
    currentUser: User;

    ngOnInit(): void {

      this.userService.getCurrentUser()
                      .then(user => {
                        this.canPublishMessages = true;
                        this.isLoadingUser = false;
                        this.currentUser = user;
                      }).catch(rs => {
                        this.noUser = true;
                        this.isLoadingUser = false;
                      });


      this.messageService.getMessages()
                         .then(messages => {
                            this.messages = messages;
                            this.isLoadingMessages = false;
                         });



      this.observables.messages.subscribe(message => {
        this.messages.unshift(message);
      });

    }
}