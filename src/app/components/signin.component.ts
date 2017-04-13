import { Component }   from '@angular/core';
import { UserService, IUserLogin } from '../services/user.service';

interface IValidationErrorSummary {
  [key:string]: string
}

@Component({
  selector: 'signin-form',
  templateUrl: '/components/signin.tpl.html',
  styleUrls: ['/assets/styles/signin.css']
})
export class SigninComponent {
  constructor (private userService: UserService) { }

  user: IUserLogin = { email: '', password: '' };
  error: String;

  attemptSignIn() : void {
    this.userService.signin(this.user)
                    .then(_ => window.location.href = '/')
                    .catch((rs) => this.error = rs._body);
  }

  goHome () : void {
    window.location.href = '/';
  }
}