import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  
  books$!: Observable<any[]>;
  formData: FormGroup;
  submitted = false;
  
  Genres: any;
  constructor(private formBuilder: FormBuilder,
    private rest: RestService) {
    this.formData = new FormGroup({ 
      Title: new FormControl(),
      Author: new FormControl(),
      PublishedYear: new FormControl(),
      Genre: new FormControl(),
      Stock: new FormControl()
   });
   }
   get f(): { [key: string]: AbstractControl } {
    return this.formData.controls;
  }
  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      Title: ['',[Validators.required]],
      Author: ['', [Validators.required]],
      PublishedYear: ['', [Validators.required]],
      Genre: ['', [Validators.required]],
      Stock: ['', [Validators.required]],
    });
    this.getGenres();
  }
  getGenres(){
    this.rest.getGenres().subscribe(data=>{
      this.Genres = data;
    })
  }
  add(data:any){
    console.log(data);
    this.rest.addBook({
      Id:0,
      Title: data.Title,
      Author: data.Author,
      PublishedYear: data.PublishedYear,
      Stock: data.Stock,
      GenreId: data.Genre
    })
    .subscribe(data=>{console.log("result add", data)})
  }
}
