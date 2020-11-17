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
  
  // getBase64(file, success, failure) {
  //   const reader = new FileReader();
  //   reader.onload = function () {
  //       var result = reader.result;
  //       var n = result.indexOf(",");
  //       var base64 = result.substring(n+1, result.length);
  //       if (success != undefined) {
  //           success(base64);
  //       }
  //   };
  //   reader.onerror = function (error) {
  //       if (failure != undefined) {
  //           failure(error);
  //       }
  //   };
  //   reader.readAsDataURL(file);
  // }    

  getMany(ch: string, from: number | string, many: number, desc: boolean, sort: string): Observable <any>  {
		const header = new HttpHeaders(); 
    const params = new HttpParams().append("channel", ch)
    .append("from", from.toString())
    .append("many", many.toString())
    .append("desc", desc.toString())
    .append("sort", sort.toString());
		return this.http.get(environment.endpoints.CONTENT_GET_MANY,  { headers: header, params: params }); 	
  }
  
  get(id: string): Observable <any> {
		const header = new HttpHeaders(); 
    const params = new HttpParams().append("uniqueId", id);
		return this.http.get(environment.endpoints.CONTENT_GET,  { headers: header, params: params }); 	
  }

  upload(channel: string, title: string, persona: string, sfw: boolean, payload: string[]){
    const post = {
      channel,
      title,
      persona: "gpJnyxNBr",
      sfw,
      payload
    };
    const header = new HttpHeaders(); 
    return this.http.post(environment.endpoints.CONTENT_CREATE,  post); 	
  }

}