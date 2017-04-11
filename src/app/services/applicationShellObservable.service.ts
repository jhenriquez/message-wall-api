import { Injectable }  from '@angular/core';
import { Subject }     from 'rxjs/Subject';

import { WallMessage } from '../models/WallMessage';

@Injectable()
export class ApplicationShellObservableService {
  private messagesAnouncementSouce = new Subject<WallMessage>();

  messages = this.messagesAnouncementSouce.asObservable();

  publishMessage (message: WallMessage) {
    this.messagesAnouncementSouce.next(message);
  }
}