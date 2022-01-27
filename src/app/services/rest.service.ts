import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiURL = environment.baseUrl;
  constructor(private http: HttpClient) {

   }

   //#region USUARIOS
   getUsers(): Observable<any[]>{
     return this.http.get<any>(this.apiURL+"Users", {headers:{"Content-Type": "application/json"}});
   }
   //#endregion
}
