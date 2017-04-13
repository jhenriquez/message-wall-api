import { Component }   from '@angular/core';
import { UserService, INewUser  } from '../services/user.service';

interface IValidationErrorSummary {
  [key:string]: string
}

@Component({
  selector: 'signup-form',
  templateUrl: '/components/signup.tpl.html',
  styleUrls: ['/assets/styles/signup.css']
})
export class SignupComponent {
  constructor (
    private userService: UserService
  ) { }

  user: INewUser = { name: '', email: '', password: '' };
  error: String;

  createAccount () {
    this.userService.signup(this.user)
                    .then(_ => window.location.href = '/')
                    .catch((rs) => this.error = rs._body);
  }

  goHome () : void {
    window.location.href = '/';
  }
}