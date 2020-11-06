import { Component } from '@angular/core';
import { SessionBus } from '../services/sessionbus.service';
import { Channel } from '../models/Channel';
import { Router } from '@angular/router';

@Component({
  selector: 'topbar-component',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  public channel: Channel = null;
  public listView: boolean = true;
  
  constructor(private sessionBus: SessionBus, private router: Router){
    const me = this;
		sessionBus.listen.subscribe(
			data => {
				if(data.event == "ChannelChange"){
          me.channel = data.data;
				}
			},
			error => {

			}
		);
  }

	goToAbout(){
		const me = this;
		me.channel = null;		
		me.router.navigate(['/about']);		
	}  

  private onSwitchView(){
    const me = this;
    me.listView = !me.listView;
    me.sessionBus.announce({ event: "SwitchView", data: me.listView });
  }

  private onUpload(){

  }

  private onSortfilter(){

  }

  private onSearch(){

  }

  private onNotifications(){

  }

  private onUser(){

  }
}
