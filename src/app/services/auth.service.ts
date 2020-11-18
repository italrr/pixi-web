import { Injectable }from "@angular/core"; 
import { HttpClient, HttpHeaders, HttpParams }from "@angular/common/http"; 
import { Observable }from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'; 
import { environment }from "../../environments/environment"; 
import { User } from '../models/User';
import { Persona } from '../models/Persona';
import { SessionBus } from './sessionbus.service';

@Injectable()
export class AuthService {

    private user: User = null;
    private persona: Persona = null;
    private authToken: string = null;
    private storageName: string = 'pixi.userdata';
    private expirationTime: number = 86400000; // 24h
    private filter: { order:string, sort: string, trend:'hot' } = {
		order: 'asc',
		sort: 'pn',
		trend: 'hot'
    };


    constructor(private http: HttpClient, private sessionBus: SessionBus) {
        const me = this;
        sessionBus.listen.subscribe(
            data => {
              if(data.event == "FilterChange"){
                me.filter = data.data;
              }
            },
            error => {
      
            }
        );
    }

    public getUser(): User {
        return this.user;
    }

    public getFilter(): { order:string, sort: string, trend:'hot' } {
        return this.filter;
    }
  
	private getPropFrom(name, src) {
		return src && src.hasOwnProperty(name) ? src[name] : undefined;
    }
        
    public login(email, password): Observable<Status>  {
		const me = this;
		let header = new HttpHeaders();
		let payload = {
			email,
			password
		};
        return new Observable<Status>(observer => {
            me.http.post(environment.endpoints.AUTH_LOGIN, payload, { headers: header }).subscribe(
                data => {
                    console.log(data);
                    observer.next(new Status("SUCCESS", StatusValue.SUCCESS, data));
                    observer.complete();
                },
                error => {
                    observer.next(new Status(error, StatusValue.FAILURE));
                    observer.complete();
                }            
            )
        });
    }

    public logout(): Observable<any> {
        const me = this;
        if(!me.user){
            console.log("No user logged in");
            return;
        }
		let header = new HttpHeaders().append("x-access-token", me.authToken);
        return new Observable<Status>(observer => {
            me.http.post(environment.endpoints.AUTH_LOGOUT, null, { headers: header }).subscribe(
                data => {
                    console.log(data);
                    observer.next(new Status("SUCCESS", StatusValue.SUCCESS, data));
                    observer.complete();
                },
                error => {
                    observer.next(new Status(error, StatusValue.FAILURE));
                    observer.complete();
                }            
            )
        });
    }

    public register(email: string, password: string): Observable<any> {
        return null;
    }

    public renew(): Observable<any> {
        const me = this;
        if(!me.user){
            console.log("No user logged in");
            return;
        }
		let header = new HttpHeaders().append("x-access-token", me.authToken);
        return new Observable<Status>(observer => {
            me.http.post(environment.endpoints.AUTH_RENEW, null, { headers: header }).subscribe(
                data => {
                    observer.next(new Status("SUCCESS", StatusValue.SUCCESS, data));
                    observer.complete();
                },
                error => {
                    observer.next(new Status(error, StatusValue.FAILURE));
                    observer.complete();
                }            
            )
        });
    }

    public isUserLoggedIn(): boolean {
        return !!this.user;
    }

    public getCurrentPersona(): Persona {
        return this.persona;
    }

    public getAuthToken(): string {
        return this.authToken;
    }

    public clearUserData(): void {
        const me = this;
        this.user = null;
        this.persona = null;
        this.authToken = null;
        localStorage.removeItem(me.storageName);
    }

    public saveUserData(): void {
        const me = this;
        const data = {
            user: me.user,
            authToken: me.authToken
        };
        localStorage.setItem(me.storageName, JSON.stringify(data));        
    }

    public loadUserData(): void {
		const me = this;
		let stored = localStorage.getItem(me.storageName);
		let data = stored ? JSON.parse(stored) : undefined;
		me.authToken = me.getPropFrom("authToken", data);
		me.user = me.getPropFrom("user", data);        
    }     

    public fetchPersonaFromUser(personas: Persona[], nick: string = null, uniqueId: string): Persona {
        let persona: Persona = null;
        for(let i = 0; i < personas.length; ++i){
            if(nick && personas[i].nick == nick || uniqueId && personas[i].uniqueId == uniqueId){
                persona = personas[i];
            }
        }
        return persona;
    }

    // If no params are provided, first persona in the User.personas array will be selected
    public selectPersona(nick: string = null, uniqueId: string = null): void {
        const me = this;
        if(!me.user || me.user.personas.length == 0){
            console.log("No user logged in or user has no personas (report this)");
            return;
        }
        // look for it
        if(nick || uniqueId){
            const persona = me.fetchPersonaFromUser(me.user.personas, nick, uniqueId);
            if(persona){
                this.persona = persona;
                return;
            }
        }
        // otherwise first one
        this.persona = this.user.personas[0];        
    }



}