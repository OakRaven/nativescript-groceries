import { Component } from "@angular/core";
import { UserService } from "./shared/user/user.service";
import { User } from "./shared/user/user";

@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: "./pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class AppComponent {
  user: User;
  isLoggingIn: boolean = true;

  constructor(private userService: UserService) {
    this.user = new User();
  }

  submit(): void {
    if(this.isLoggingIn) {
      this.login();
    } else {
      this.signup();
    }
  }

  login(): void {
    // TODO: define
  }

  signup(): void {
    this.userService.register(this.user);
  }

  toggleDisplay(): void {
    this.isLoggingIn = !this.isLoggingIn;
  }

}