import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SectionComponent} from './section/section.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DetailedSectionComponent} from './detailed-section/detailed-section.component';
import {ThreadComponent} from './thread/thread.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/section',
    pathMatch: 'full'
  },
  {
    path: 'section',
    component: SectionComponent,
  },
  {
    path: 'section/:sectionId',
    component: DetailedSectionComponent
  },
  {
    path: 'user/:userId',
    component: UserComponent
  },
  {
    path: 'thread/:threadId',
    component: ThreadComponent
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
