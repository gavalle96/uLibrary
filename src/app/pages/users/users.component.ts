import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usuarios: any;
  dataSource$! : Observable<any[]>;
  
  columns = [
    {
      columnDef: 'Id',
      header: 'No.',
      cell: (element: any) => `${element.Id}`,
    },
    {
      columnDef: 'FirsName',
      header: 'Name',
      cell: (element: any) => `${element.FirstName}`,
    },
    {
      columnDef: 'LastName',
      header: 'Last Name',
      cell: (element: any) => `${element.LastName}`,
    },
    {
      columnDef: 'Email',
      header: 'Email',
      cell: (element: any) => `${element.Email}`,
    },
    {
      columnDef: 'Password',
      header: 'Password',
      cell: (element: any) => `${element.Password}`,
    },
    {
      columnDef: 'RoleName',
      header: 'Role',
      cell: (element: any) => `${element.RoleName}`,
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  constructor(private rest: RestService, public dialog: MatDialog) {
    this.rest.getUsers()
    .subscribe(data=>{
      console.log(data);
      this.usuarios = data;
    })
   }

  ngOnInit(): void {
    this.dataSource$ = this.rest.getUsers();
  }

  showAdd(){
    const dialogRef = this.dialog.open(UserAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

}
