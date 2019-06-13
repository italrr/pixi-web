import { Component, Input, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ContentService } from 'src/app/services/content.service';
import { bypassSanitizationTrustResourceUrl } from '@angular/core/src/sanitization/bypass';
import { Content } from 'src/app/models/Content';


@Component({
	selector: "view-channel",
	templateUrl: "./channel.component.html",
	styleUrls: ["./channel.component.scss"],
	host: {
		class:'router-comp-fit'
	}
})
export class ViewChannel {

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private contentService: ContentService
	) { }

	private contents: Content[] = []
	private lastScrollIndex: number = 0;
	private lastScrollDir: string = 'downwards';
	private lastFetchTimeout: number = new Date().getTime();
	private from: string | number = 0;
	private many: number = 6;
	private sort: string = 'PN';
	private desc: boolean = true;
	

	ngOnInit() {
		const me = this;
		
	}

	@HostListener('scroll', ['$event']) 
    onScroll(event) {
		const min = event.target.offsetHeight;
		const current = event.target.offsetHeight + event.target.scrollTop;
		const max = event.target.scrollHeight;

		if(this.lastScrollIndex - current < 0){
			this.lastScrollDir = 'downwards';
		}else
		if(this.lastScrollIndex - current > 0){
			this.lastScrollDir = 'upwards';
		}
		if(current > max * 0.75){
			this.fetch(true);
		}else
		if(current < min * 1.25){
			this.fetch(false);
		}
		this.lastScrollIndex = current;
    }	
	
	public fetch(downwards: boolean = true): Promise<any> {
		// to avoid sudden freezes on the ui, we'll try doing our manipulation of the
		// list of contents inside a promise
		return new Promise<any>((resolve, reject) => {
			if(new Date().getTime() - this.lastFetchTimeout < 1000){
				resolve();
				return;
			}
			this.lastFetchTimeout = new Date().getTime();
			this.contentService.get('misc', this.from, this.many, this.desc, this.sort).subscribe((data) => {
				console.log(data)
				resolve();
			});
			
		});
	}

	public switchChannel(ch: string) {

	}
}