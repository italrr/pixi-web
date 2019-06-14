import { Component, Input, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Content } from 'src/app/models/Content';


@Component({
	selector: "view-list",
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.scss"]
})
export class ViewList {

	constructor(
		private route: ActivatedRoute,
		private router: Router
    ) { }
    
    @Input('contents') contents: Content[];

	ngOnInit() {
		const me = this;
		
	}
}