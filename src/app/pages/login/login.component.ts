
import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email="";
  password="";
  formData: FormGroup;
  submitted = false;
  constructor(private rest: RestService
    , private formBuilder: FormBuilder
    , private _snackBar: MatSnackBar
    , private router: Router) {
    // this.rest.Login("gavalle96@gmail.com","passphrase")
    // .subscribe(data=>{
    //   console.log(data);
    // })

    this.formData = new FormGroup({ 
      email: new FormControl(),
      password: new FormControl()
   });
   }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.formData.controls;
  }
  login(data:any){
    // console.log(data);
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }
    this.rest.Login(data.email,data.password)
    .subscribe(data=>{
      console.log(data);
      if(data.result == 0){
        this.openSnackBar(data.message);
      }
      else{
        sessionStorage.setItem("token", data.data.Token);
        sessionStorage.setItem("userId", data.data.Id);

        this.router.navigateByUrl("books");
      }
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 4000
    });
  }

}
