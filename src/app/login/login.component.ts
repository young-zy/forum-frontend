import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user/user.service';
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {
  NotificationDialogComponent,
  NotificationDialogData
} from '../notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  get usernameControl(): FormControl{
    return this.loginForm.get('username') as FormControl;
  }

  get passwordControl(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  private usernameExists = true;
  private passwordIncorrect = false;
  private executeFlag = false;

  loginForm = this.formBuilder.group({
    username: [undefined, [Validators.required, this.usernameExistsValidator.bind(this)]],
    password: [undefined, [Validators.required, this.passwordValidator.bind(this)]]
  });

  ngOnInit(): void {
    this.userService.selfInfo.subscribe(
      user => {
        if (!this.executeFlag && user){
          const dialogData: NotificationDialogData = {
            message: '已经登陆，将跳转至首页'
          };
          const dialogRef = this.dialog.open(NotificationDialogComponent, {
            data: dialogData
          });
          dialogRef.afterClosed().subscribe(
            () => {
              this.router.navigate(['/']).then();
            }
          );
          console.log('already logged in');
        }
      }
    );
  }

  usernameExistsValidator(control: AbstractControl): ValidationErrors | null{
    const res = this.usernameExists ? null : {usernameNotExist: control.value};
    this.usernameExists = true;
    return res;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null{
    const res = this.passwordIncorrect ? {passwordIncorrect: control.value} : null;
    this.passwordIncorrect = false;
    return res;
  }

  registerClicked(): void{
    this.router.navigate(['/register']).then();
  }

  formSubmit(): void{
    if (!this.loginForm.valid){
      return;
    }
    console.log('submit clicked');
    this.executeFlag = true;
    this.usernameExists = true;
    this.passwordIncorrect = false;
    this.userService.login(this.loginForm.value).subscribe(
      () => {
        console.log('login success');
        this.router.navigate(['/']).then();
      },
      error => {
        console.log('login failed');
        this.executeFlag = false;
        if (error.error.reason === 'Password Incorrect'){
          this.passwordIncorrect = true;
          this.passwordControl.updateValueAndValidity();
        } else {
          this.usernameExists = false;
          this.usernameControl.updateValueAndValidity();
        }
      }
    );
  }
}
