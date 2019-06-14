import {Injectable }from "@angular/core"; 
import {HttpClient, HttpHeaders, HttpParams }from "@angular/common/http"; 
import { Observable }from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'; 
import {environment }from "../../environments/environment"; 

@Injectable()
export class ChannelService {

  constructor(private http: HttpClient) {

  }
  
  get(ch: string): Observable <any>  {
		const header = new HttpHeaders(); 
    const params = new HttpParams().append("name", ch);
		return this.http.get(environment.endpoints.CHANNEL_GET,  { headers: header, params: params }); 	
  }

}