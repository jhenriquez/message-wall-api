import { Component, Input } from '@angular/core';
import { MessageService }   from '../services/message.service';

@Component({
  selector: 'publish-message',
  templateUrl: '/components/publishMessage.tpl.html',
  styleUrls: ['assets/styles/publishMessage.css']
})
export class PublishMessageComponent {

  constructor (private messageService: MessageService) {}

  message: String;
  @Input() gravatarHash: String;

  publish () {

  }
}