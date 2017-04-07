import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { SigninComponent }  from '../components/signin.component';
import { FormsModule }      from "@angular/forms";


@NgModule({
  declarations: [ SigninComponent ],
  imports: [ BrowserModule, FormsModule ],
  providers: [],
  bootstrap: [ SigninComponent ]
})
export class SigninModule {}