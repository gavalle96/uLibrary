import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  inSession = false;
  user: any={};
  constructor(private rest: RestService, private router: Router){

  }

  ngOnInit(){
    //si no hay token de sesion presentar login
    if(!sessionStorage.getItem("token"))
    {
      this.inSession = false;
      this.router.navigateByUrl("login");
    }
    else{
      this.inSession = true;
      this.getUserInfo();
    }
  }

  getUserInfo(){
    let id = sessionStorage.getItem("userId");
    this.rest.getUsers(id)
    .subscribe(data => {
      console.log(data);
      this.user = data;
    })
  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl("login");
  }
}
