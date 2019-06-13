import { Component, Input, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";


@Component({
	selector: "view-about",
	templateUrl: "./about.component.html",
	styleUrls: ["./about.component.scss"]
})
export class ViewAbout {


	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		const me = this;
		
	}
}