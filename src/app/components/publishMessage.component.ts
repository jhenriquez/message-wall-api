import { Component, Input } from '@angular/core';

@Component({
  selector: 'publish-message',
  templateUrl: '/components/publishMessage.tpl.html',
  styleUrls: ['assets/styles/publishMessage.css']
})
export class PublishMessageComponent {
  message: String;
  @Input() gravatarHash: String;
}