import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { UserService } from "../../shared/user/user.service";
import { User } from "../../shared/user/user";
import { Color } from "color";
import { View } from "ui/core/view";


@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: "./pages/login/login.html",
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent implements OnInit {
    user: User;
    isLoggingIn: boolean = true;
    @ViewChild("container") container: ElementRef;

    constructor(
        private router: Router,
        private userService: UserService,
        private page: Page
    ) {
        this.user = new User();
        this.user.email = "oakraven13@gmail.com";
        this.user.password = "nicom";
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://bg_login";
    }

    submit(): void {
        if (!this.user.isValidEmail()) {
            alert("Enter a valid email address.");
            return;
        }

        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    login(): void {
        this.userService.login(this.user)
            .subscribe(
            () => this.router.navigate(["/list"]),
            (err) => alert("Unfortunately we could not find your account.")
            );
    }

    signUp() {
        this.userService.register(this.user)
            .subscribe(
            () => {
                alert("Your account was successfully created.");
                this.toggleDisplay();
            },
            () => alert("Unfortunately we were unable to create your account.")
            );
    }

    toggleDisplay(): void {
        this.isLoggingIn = !this.isLoggingIn;

        let container = <View>this.container.nativeElement;
        container.animate({
            backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
            duration: 200
        });
    }
}