import { Component, Input } from '@angular/core';
import { WallMessage }      from "../models/WallMessage";

@Component({
  selector: 'wall-message',
  templateUrl: '/components/wallMessage.tpl.html',
  styleUrls: ['assets/styles/wallMessage.css']
})
export class WallMessageComponent {
  @Input() message: WallMessage;

  getGravatarUrl (): string {
    return `https://gravatar.com/avatar/${this.message.author.emailHash}?s=200`;
  }
}