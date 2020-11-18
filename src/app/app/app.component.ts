import { Component,HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SessionBus } from '../services/sessionbus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pixi-web';

  constructor(private sessionBus: SessionBus, private authService: AuthService){

  }

  ngAfterViewInit(){
    this.authService.loadUserData();
  }

	@HostListener('scroll', ['$event'])
  onScroll(event){
    const me = this;
    me.sessionBus.announce({ event: "Scroll", data: event });
  }
}
