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
  errors: String[] = [];

  /*
   * TODO: This code is repeated! Alert! Is Repeated in both Signin and Signup components.
   * Needs to be addressed.
   *
   * I believe the main problem is a lack of consistency in general errors
   * returning from the API.
   */
  private notifyMultipleErrors (errors: IValidationErrorSummary) {
    Object.keys(errors).forEach(k => {
      this.errors.push(errors[k]);
    });
  }

  private attemptingSignIn: Boolean = false;

  attemptSignIn() : void {
    this.attemptingSignIn = true;
    this.userService.signin(this.user)
                    .then(_ => window.location.href = '/')
                    .catch((rs) => {
                      this.errors = [];
                      this.attemptingSignIn = false;
                      if (rs.status === 422) {
                        return this.notifyMultipleErrors(rs.json());
                      }
                      this.errors.push(rs._body);
                    });
  }

  goHome () : void {
    window.location.href = '/';
  }
}