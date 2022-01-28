import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  formData: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private rest: RestService) {
    this.formData = new FormGroup({ 
      FirstName: new FormControl(),
      LastName: new FormControl(),
      Email: new FormControl(),
      Password: new FormControl(),
      Role: new FormControl()
   });
   }
   get f(): { [key: string]: AbstractControl } {
    return this.formData.controls;
  }
  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      FirstName: ['',[Validators.required]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Role: ['', [Validators.required]],
    });
  }
  add(data:any){
    console.log(data);
    this.rest.addUser({
      Id:0,
      FirstName:data.FirstName,
      LastName:data.LastName,
      Email:data.Email,
      Password:data.Password,
      RoleName: data.Role
    })
    .subscribe(data=>{console.log("result add", data)})
  }
}
