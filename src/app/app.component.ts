import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library';
  inSession = false;
  constructor(private router: Router){

  }

  ngOnInit(){
    //si no hay token de sesion presentar login
    console.log("token",!sessionStorage.getItem("token"));
    if(!sessionStorage.getItem("token"))
    {
      this.inSession = false;
      this.router.navigateByUrl("login");
    }
    else{
      this.inSession = true;
      this.router.navigateByUrl("books")
    }
  }
}
