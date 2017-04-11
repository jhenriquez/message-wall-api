import { Component }   from '@angular/core';
import { UserService } from '../services/user.service';

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

  errors: String[] = [];
  name: String;
  email: String;
  password: String;

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

  createAccount () {
    this.userService.signup({
      name: this.name,
      email: this.email,
      password: this.password
    }).then(() => {
      window.location.href= '/';
    }).catch((rs) => {
      this.errors = [];
      if (rs.status ===  422) {
        return this.notifyMultipleErrors(rs.json());
      }
      this.errors.push(rs._body);
    });
  }

  goHome () : void {
    window.location.href = '/';
  }
}