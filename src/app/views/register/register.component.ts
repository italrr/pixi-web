import { Component, Input, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";


@Component({
	selector: "view-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"]
})
export class ViewRegister {


	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		const me = this;
		
	}
	
	onRegister(){

	}
}