import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usuarios: any;
  constructor(private rest: RestService) {
    this.rest.getUsers()
    .subscribe(data=>{
      console.log(data);
      this.usuarios = data;
    })
   }

  ngOnInit(): void {
  }

}
