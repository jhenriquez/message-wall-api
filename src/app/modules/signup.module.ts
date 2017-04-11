import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { SignupComponent }  from '../components/signup.component';
import { UserService }      from '../services/user.service';

@NgModule({
  declarations: [ SignupComponent ],
  imports: [ BrowserModule, FormsModule, HttpModule ],
  providers: [ UserService ],
  bootstrap: [ SignupComponent ]
})
export class SignupModule {}