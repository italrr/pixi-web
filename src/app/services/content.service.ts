import {Injectable }from "@angular/core"; 
import {HttpClient, HttpHeaders, HttpParams }from "@angular/common/http"; 
import { Observable }from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'; 
import {environment }from "../../environments/environment"; 

@Injectable()
export class ContentService {

  constructor(private http: HttpClient) {

  }
  
  get(ch: string, from: number | string, many: number, desc: boolean, sort: string): Observable <any>  {
		const me = this; 
		const header = new HttpHeaders(); 
    const params = new HttpParams().append("channel", ch)
    .append("from", from.toString())
    .append("many", many.toString())
    .append("desc", desc.toString())
    .append("sort", sort.toString())
		return this.http.get(environment.endpoints.CONTENT_GET,  { headers: header, params: params }); 	
  }

}