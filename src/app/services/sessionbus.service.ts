import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SessionBus {

  private announceSource = new Subject<any>();

  listen = this.announceSource.asObservable();

  announce(session: any) {
    this.announceSource.next(session);
  }

}
