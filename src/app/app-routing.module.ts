import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './pages/books/books.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { GenresComponent } from './pages/genres/genres.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "users", component: UsersComponent},
  {path: "genres", component: GenresComponent},
  {path: "checkout", component: CheckoutComponent},
  {path: "books", component: BooksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
