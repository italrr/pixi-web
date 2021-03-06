import { Component, Input, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router, ResolveEnd } from "@angular/router";
import { ContentService } from 'src/app/services/content.service';
import { Content } from 'src/app/models/Content';
import { Channel } from 'src/app/models/Channel';
import { ChannelService } from 'src/app/services/channel.service';
import { SessionBus } from 'src/app/services/sessionbus.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
	selector: "view-channel",
	templateUrl: "./channel.component.html",
	styleUrls: ["./channel.component.scss"],
	host: {
		class:'router-comp-fit'
	}
})
export class ViewChannel {

	private listView: boolean = true;
	private contents: Content[] = []
	private lastScrollIndex: number = 0;
	private lastScrollDir: string = 'downwards';
	private lastFetchTimeout: number = 0;
	private from: string | number = 0;
	private start: number | null = null;
	private startLast: number = -1;
	private many: number = 10;
	private routingSubs: Subscription;
	private channel: Channel;
	private currentFetch: Promise<any> = null;
	private maxBuffer: number = 25; // max number of posts on the screen
	private filter: { order:string, sort: string, trend:'hot' }  = {
		order: 'des',
		sort: 'pn',
		trend: 'hot'
	};
  

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private contentService: ContentService,
		private channelService: ChannelService,
		private activatedRoute: ActivatedRoute,
		private sessionBus: SessionBus,
		private authService: AuthService
	) { 
		const me = this;
		sessionBus.listen.subscribe(
			data => {
				if(data.event == "SwitchView"){
					me.listView = data.data;
					me.maxBuffer = me.listView ? 25 : 50;
					me.fetch();
				}			
				if(data.event == "FilterChange"){
					if(me.startLast != -1){
						me.start = me.startLast;
					}
					me.contents = [];
					me.filter = data.data;
					me.fetch();
				}     					
				if(data.event == "Scroll"){
					let event = data.data;
					const min = event.target.offsetHeight;
					const current = event.target.offsetHeight + event.target.scrollTop;
					const max = event.target.scrollHeight;	
					if(this.lastScrollIndex - current < 0){
						this.lastScrollDir = 'downwards';
					}else
					if(this.lastScrollIndex - current > 0){
						this.lastScrollDir = 'upwards';
					}
					if(current > max * 0.75 && this.lastScrollDir == 'downwards'){
						this.fetch(true);
					}else
					if(current < min * 1.25 && this.lastScrollDir == 'upwards'){
						this.fetch(false);
					}
					this.lastScrollIndex = current;					
				}
			},
			error => {

			}
		);
		this.route.fragment.subscribe((fragment: string) => {
			if(!fragment){
				me.startLast = -1;
				return;
			}
			me.contents = [];
			me.start = parseInt(fragment);
			me.startLast = me.start;
			me.fetch();
		})		
		me.filter = authService.getFilter();
	}

	ngOnInit() {
		const me = this;
		me.routingSubs = me.activatedRoute.params.subscribe((params: Params) => {
			let chan = params["channel"];
			me.channelService.get(chan).subscribe((data) => {
				me.sessionBus.announce({ event: "ChannelChange", data });
				me.channel = data;
				me.fetch();
			});
		});
	}

	public getHighestPostNumber(): number {
		let highest = 0;
		for(let i = 0; i < this.contents.length; ++i){
			if(this.contents[i].orderId > highest){
				highest = this.contents[i].orderId;
			}
		}
		return highest;
	}

	public getLowestPostNumber(): number {
		let lowest = this.getHighestPostNumber();
		for(let i = 0; i < this.contents.length; ++i){
			if(this.contents[i].orderId < lowest){
				lowest = this.contents[i].orderId;
			}
		}
		return lowest;
	}	

	public fetch(downwards: boolean = true): Promise<any> {
		const me = this;
		if(me.currentFetch){
			me.currentFetch = me.currentFetch.then(() => {
				me.fetch(downwards);
			});
			return;
		}
		// to avoid sudden freezes on the ui, we'll try doing our manipulation of the
		// list of contents inside a promise
		let ins = new Promise<any>((resolve, reject) => {
			if(new Date().getTime() - this.lastFetchTimeout < 200){
				resolve();
				return;
			}
			if(!me.channel){
				resolve();
				return;
			}
			me.lastFetchTimeout = new Date().getTime();
			const desc = downwards == (me.filter.order == "des");
			let jumpTo = 0;
			if(me.start){
				jumpTo = this.start;
				me.start -= 5 * (desc ? 1 : -1);
				if(me.start < 1) me.start = 1;
			}
			me.from = me.start ? me.start : (desc ? me.getHighestPostNumber() + 1 : me.getLowestPostNumber() - 1);
			me.contentService.getMany(me.channel.name, me.from, me.many, desc, me.filter.sort).subscribe((data: Content[]) => {
				// TODO: implement inverted order for PN
				switch(me.filter.sort){
					case 'pn':
						data = data.sort((a: Content, b: Content) => {
							return desc ? a.orderId - b.orderId : b.orderId - a.orderId;
						});
						for(let i = 0; i < data.length; ++i){
							let index = downwards ? me.contents.length : 0;
							me.contents.splice(index, 0, data[i]);
						}
						if(me.contents.length > me.maxBuffer){
							for(let i = 0; i < me.contents.length - me.maxBuffer; ++i){
								if(downwards){
									me.contents.shift();
								}else{
									me.contents.pop();
								}
							}
						}
						break;
				}			
				setTimeout(() => {
					if(me.start){
						let post = document.getElementById('post-'+jumpTo);
						me.start = null;
						if(!post){
							return;
						}
						post.scrollIntoView();
					}	
				}, 100);
				resolve();
			});
			
		});
		ins.then(() => {
			me.currentFetch = null;
		});
		me.currentFetch = ins;
		return ins;
	}

	public switchChannel(ch: string) {

	}
}