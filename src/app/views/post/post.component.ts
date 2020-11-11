import { Component, Input, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ContentService } from 'src/app/services/content.service';
import { Content } from 'src/app/models/Content';
import { Channel } from 'src/app/models/Channel';
import { ChannelService } from 'src/app/services/channel.service';
import { SessionBus } from 'src/app/services/sessionbus.service';


@Component({
	selector: "view-post",
	templateUrl: "./post.component.html",
	styleUrls: ["./post.component.scss"]
})
export class ViewPost {

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private channelService: ChannelService,
		private contentService: ContentService,
		private sessionBus: SessionBus
	) { }

	private uniqueId: string = "none";
	private content: Content = null;
	private channel: Channel = null;

	ngOnInit() {
		const me = this;
		me.route.params.subscribe((params: Params) => {
			me.uniqueId = params["post"];
			let chan = params["channel"];
			me.channelService.get(chan).subscribe((data) => {
				me.sessionBus.announce({ event: "ChannelChange", data });
				me.channel = data;
				me.contentService.get(me.uniqueId).subscribe((data: Content) => {			
					me.content = data;
				});
			});
		});
	}
}