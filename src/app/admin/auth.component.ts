import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "../model/auth.service";

@Component({
    moduleId: module.id,
    templateUrl: "auth.component.html"
})
export class AuthComponent {
    public username: string;
    public password: string;
    public errorMessage: string;

    constructor(private router: Router,
        private authService: AuthService) { }

    authenticate(form: NgForm) {
        if (form.valid) {
            this.authService.authenticate(this.username, this.password)
                .subscribe(authenticated => {
                    if (authenticated) {
                        this.router.navigateByUrl('/admin/main');
                    }
                    this.errorMessage = 'Authentication Failed';
                });
        } else {
            this.errorMessage = 'Form Data Invalid';
        }
    }
}