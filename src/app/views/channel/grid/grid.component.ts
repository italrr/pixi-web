import { Component, Input, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Content } from 'src/app/models/Content';
import { Channel } from 'src/app/models/Channel';


@Component({
	selector: "view-grid",
	templateUrl: "./grid.component.html",
	styleUrls: ["./grid.component.scss"]
})
export class ViewGrid {

	constructor(
		private route: ActivatedRoute,
		private router: Router
    ) { }
    
	@Input('contents') contents: Content[];
	@Input('channel') channel: Channel;

	ngOnInit() {
		const me = this;
		
	}
}