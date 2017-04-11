import { Component, Input }                  from '@angular/core';
import { MessageService }                    from '../services/message.service';
import { ApplicationShellObservableService } from '../services/applicationShellObservable.service';
import { WallMessage }                       from '../models/WallMessage';

@Component({
  selector: 'publish-message',
  templateUrl: '/components/publishMessage.tpl.html',
  styleUrls: ['assets/styles/publishMessage.css']
})
export class PublishMessageComponent {

  constructor (
    private messageService: MessageService,
    private messagesObservable: ApplicationShellObservableService
  ) {}

  error: String;
  messageText: String;
  @Input() gravatarHash: String;

  private propagateAndClear (message: WallMessage) {
    this.messagesObservable.publishMessage(message);
    this.error = '';
    this.messageText = '';
  }

  publish () {
    this.messageService.publish(this.messageText)
                       .then(this.propagateAndClear.bind(this))
                       .catch(err => this.error = err.message);
  }
}