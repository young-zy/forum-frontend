import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../core/services/user/user.service';
import { User } from '../core/entity/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user: User = null;

  constructor(
    private location: Location,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getSelf();
    this.userService.selfInfo.subscribe(
      user => this.user = user
    );
  }

  get isRoot(): boolean {
    return this.location.isCurrentPathEqualTo('/section');
  }

  backClicked(): void{
    console.log('back button clicked');
    this.location.back();
  }

  loginButtonClicked(): void{
    this.router.navigate(['/login']).then();
  }

  registerButtonClicked(): void{
    this.router.navigate(['/register']).then();
  }

  logoutClicked(): void {
    this.userService.logout();
  }

}
