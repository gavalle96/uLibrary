import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { BookAddComponent } from '../book-add/book-add.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  checkout = 0;
  constructor(private rest: RestService, public dialog: MatDialog
    , private _snackBar: MatSnackBar) {
    
   
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

  makeCheckOut(BookId:number, stock: number){
    if(this.checkout <= 0){
      this.openSnackBar("The requested quantity of copies cannot be less than one")
      return;
    }
    if(this.checkout > stock){
      this.openSnackBar("The requested quantity of copies cannot be greater than the stock")
      return;
    }
    console.log(BookId);
    this.rest.addCheckOut({
      Id: 0,
      RequestDate: new Date().toISOString(),
      isReturned: false,
      BookId: BookId,
      UserId: sessionStorage.getItem("userId"),
      Copies: this.checkout
    })
    .subscribe(data=>{
      this.checkout = 0;
      this.decreaseBookStock(BookId, this.checkout, stock);
    })
  }

  decreaseBookStock(BookId:number, qty:number, stock: number){
    
    this.rest.getBooks(BookId)
    .subscribe(book =>{
      let newStock = book.Stock - qty;
      book.Stock = newStock;
      this.rest.updateBook(book)
      .subscribe(data=>{
        this.filter();
        this.openSnackBar("CheckOut Completed!")
      })
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
