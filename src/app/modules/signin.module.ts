import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';

import { UserService }      from '../services/user.service';
import { SigninComponent }  from '../components/signin.component';

@NgModule({
  declarations: [ SigninComponent ],
  imports: [ BrowserModule, FormsModule, HttpModule ],
  providers: [ UserService ],
  bootstrap: [ SigninComponent ]
})
export class SigninModule { }