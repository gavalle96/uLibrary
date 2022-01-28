import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { BookAddComponent } from '../book-add/book-add.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BooksComponent implements OnInit {

  userRole: any = {};
  title = "";
  author = "";
  genre = ""
  genres: any = [];
  books$!: Observable<any[]>;
  expandedElement: any;
  displayedColumns: string[] = ['Title', 'Author', 'PublishedYear'];
  constructor(private rest: RestService, public dialog: MatDialog) {
    
   
   }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem("userRole");   
   this.getGenres();
   this.getBooks();
  }

  getGenres(){
    this.rest.getGenres().subscribe(data=>{
      this.genres = data;
    })
  }
  getBooks(){
    this.books$ = this.rest.getBooks();
  }

  filter(){
    console.log(this.title)
    this.books$ = this.rest.getBooks(undefined, this.title, this.author, this.genre);
  }

  showAdd(){
    const dialogRef = this.dialog.open(BookAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.filter();
    });
  }

  getGenreName(id:number){
    return this.genres.filter((item: any) =>  item.Id == id)[0].Name;
  }
}
