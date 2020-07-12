import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, ValidationErrors, Validators} from '@angular/forms';
import {UserService} from '../core/services/user/user.service';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private executeFlag = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  registerForm = this.formBuilder.group({
    email: [undefined, [Validators.required, Validators.email]],
    username: [undefined, [Validators.required, Validators.pattern('^(?=.{4,20}\$)(?![_0-9])(?!.*[_]{2})[a-zA-Z0-9_-]+(?<![_])\$')]],
    password: [undefined, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z!@#\$%^&*\\d]{8,}\$')]],
    confirmPassword: [undefined, [Validators.required]]
  }, {validators: this.passwordMatchValidator});

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.userService.selfInfo.subscribe(
      () => {
        if (!this.executeFlag){
          console.log('already logged in');
        }
      }
    );
  }

  loginButtonClicked(): void{
    this.router.navigate(['/login']).then();
  }

  get emailControl(): FormControl{
    return this.registerForm.get('email') as FormControl;
  }

  get usernameControl(): FormControl{
    return this.registerForm.get('username') as FormControl;
  }

  get passwordControl(): FormControl{
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl{
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null{
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? {passwordMismatch: true} : null;
  }

  registerFormSubmit(): void{
    if (!this.registerForm.valid){
      return;
    }
    this.userService.register(this.registerForm.value)
      .subscribe(
        () => {
          this.router.navigate(['/']).then();
        },
        error => {
          if (error){

          }
        }
      );
  }
}

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);                             // error state when is empty
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return control.parent.errors && control.parent.errors.passwordMismatch && control.touched && (invalidCtrl || invalidParent);
  }
}
