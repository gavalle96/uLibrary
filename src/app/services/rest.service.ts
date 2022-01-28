import { HttpClient, HttpParams } from '@angular/common/http';
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
   getUsers(id?:any): Observable<any[]>{
     return this.http.get<any>(this.apiURL+"Users"+(id ? "/"+id : ""), {headers:{"Content-Type": "application/json"}});
   }

   Login(Email: string, Password:string): Observable<any>{
    return this.http.post<any>(this.apiURL+"Login",{Email: Email, Password: Password }, {headers:{"Content-Type": "application/json"}});
  }
   isEmailValid(Id: number,Email: string): Observable<any>{
    return this.http.get<any>(this.apiURL+"isEmailValid?id="+Id+"&Email="+Email, {headers:{"Content-Type": "application/json"}});
  }
   updateUser(user:any): Observable<any>{
    return this.http.put<any>(this.apiURL+"Users/"+user.Id, user, {headers:{"Content-Type": "application/json"}});
  }
   addUser(user:any): Observable<any>{
    return this.http.post<any>(this.apiURL+"Users", user, {headers:{"Content-Type": "application/json"}});
  }
   deleteUser(id:number): Observable<any>{
    return this.http.delete<any>(this.apiURL+"Users/"+id, {headers:{"Content-Type": "application/json"}});
  }

   //#endregion

   //#region GENEROS
   getGenres(id?:number): Observable<any[]>{
    return this.http.get<any>(this.apiURL+"Genres"+(id ? "/"+id : ""), {headers:{"Content-Type": "application/json"}});
  }

  updateGenre(genre:any): Observable<any>{
   return this.http.put<any>(this.apiURL+"Genres/"+genre.Id, genre, {headers:{"Content-Type": "application/json"}});
 }
  addGenre(genre:any): Observable<any>{
   return this.http.post<any>(this.apiURL+"Genres", genre, {headers:{"Content-Type": "application/json"}});
 }
  deleteGenre(id:number): Observable<any>{
   return this.http.delete<any>(this.apiURL+"Genres/"+id, {headers:{"Content-Type": "application/json"}});
 }

  //#endregion

  //#region Libros BOOKS
  getBooks(id?:number, title?:string, author?: string, genreId?: string): Observable<any>{
    return this.http.get<any>(this.apiURL+"Books"+(id ? "/"+id : "")+"?"+(title ? "title="+title:"")+ (author?"&author="+author : "")+ (genreId?"&genreId="+genreId : ""), {headers:{"Content-Type": "application/json"}
    
  } );
  }

  updateBook(book:any): Observable<any>{
   return this.http.put<any>(this.apiURL+"Books/"+book.Id, book, {headers:{"Content-Type": "application/json"}});
 }
  addBook(book:any): Observable<any>{
   return this.http.post<any>(this.apiURL+"Books", book, {headers:{"Content-Type": "application/json"}});
 }
  deleteBook(id:number): Observable<any>{
   return this.http.delete<any>(this.apiURL+"Books/"+id, {headers:{"Content-Type": "application/json"}});
 }

  //#endregion

  //#region CHECKOUTS
  getCheckOuts(id?:number): Observable<any[]>{
    return this.http.get<any>(this.apiURL+"CheckOuts"+(id ? "/"+id : ""), {headers:{"Content-Type": "application/json"}});
  }

  updateCheckOut(checkout:any): Observable<any>{
   return this.http.put<any>(this.apiURL+"CheckOuts/"+checkout.Id, checkout, {headers:{"Content-Type": "application/json"}});
 }
  addCheckOut(checkout:any): Observable<any>{
   return this.http.post<any>(this.apiURL+"CheckOuts", checkout, {headers:{"Content-Type": "application/json"}});
 }
  deleteCheckOut(id:number): Observable<any>{
   return this.http.delete<any>(this.apiURL+"CheckOuts/"+id, {headers:{"Content-Type": "application/json"}});
 }

  //#endregion
  }
