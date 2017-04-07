import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { SignupComponent }  from '../components/signup.component';
import { FormsModule }      from "@angular/forms";

@NgModule({
  declarations: [ SignupComponent ],
  imports: [ BrowserModule, FormsModule ],
  providers: [],
  bootstrap: [ SignupComponent ]
})
export class SignupModule {}