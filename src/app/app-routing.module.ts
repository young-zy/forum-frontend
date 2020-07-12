import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SectionComponent} from './section/section.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/section',
    pathMatch: 'full'
  },
  {
    path: 'section',
    component: SectionComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'NotFound',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/NotFound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
