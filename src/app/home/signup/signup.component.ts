import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { userNameIsDifferentPasswordValidator } from './username-is-different-password-validator';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ]
})
export class SignUpComponent implements OnInit {
    signupForm: FormGroup;
    @ViewChild('inputEmail') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
    ) { }

    ngOnInit(): void {
        this.createSignUpForm();

        this.platformDetectorService.isPlatformBrowser()
            && this.emailInput.nativeElement.focus();
    }

    createSignUpForm(): void {
        this.signupForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            fullName: ['', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(40)
            ]],
            userName: ['', [
                Validators.required,
                lowerCaseValidator,
                Validators.minLength(2),
                Validators.maxLength(30)
            ],
            this.userNotTakenValidatorService.checkUserNameTaken()],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(14)
            ]]
        }, {
            validator: userNameIsDifferentPasswordValidator
        })
    }

    signUp() {
        if(this.signupForm.invalid || this.signupForm.pending) {
            return;
        }

        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signUpService
            .signUp(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                error => console.log(error)
            );
    }
}