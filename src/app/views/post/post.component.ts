import { Component, Input, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Content } from 'src/app/models/Content';
import { environment }from "../../../environments/environment"; 

@Component({
	selector: "view-post",
	templateUrl: "./post.component.html",
	styleUrls: ["./post.component.scss"]
})
export class ViewPost {

	constructor(
		private route: ActivatedRoute,
		private router: Router
    ) { }
    
    @Input('content') content: Content;
    @Input('compat') compat: boolean = false;

	ngOnInit() {
		const me = this;
		
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