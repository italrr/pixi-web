import { Component, Input, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Content } from 'src/app/models/Content';
import { environment }from "../../environments/environment"; 
import * as numeral from "numeral";
import * as moment from "moment";
import { Channel } from '../models/Channel';

@Component({
	selector: "component-post",
	templateUrl: "./post.component.html",
	styleUrls: ["./post.component.scss"]
})
export class ComponentPost {

	constructor(
		private route: ActivatedRoute,
		private router: Router
    ) { }
    
	@Input('content') content: Content = null;
	@Input('channel') channel: Channel = null;
	@Input('compat') compat: boolean = false;
	@Input('nocomment') noComment: boolean = false;

	ngOnInit() {
		const me = this;
		
	}
	
	callMoment(date: Date) {
		return moment(date).fromNow();
	}

	callNumeral(num: any) {
		var numlib = numeral(num);
		return numlib.format("0a");
	}
	
	getFullDate(date) {
		return new Date(date).toLocaleString();
	}	

    private getSourceURL(uniqueId: string){
        return `${environment.endpoints.THUMBNAIL}${this.content.sources[0].uniqueId}`;
    }
    
	private isLiked(){
		return true
    }

	private isDisliked(){
		return false
	}    
}

