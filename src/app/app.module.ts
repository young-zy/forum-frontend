import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SectionComponent } from './section/section.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {TokenInterceptorService} from './core/interceptors/token-interceptor.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { DetailedSectionComponent } from './detailed-section/detailed-section.component';
import { ThreadComponent } from './thread/thread.component';
import { UserComponent } from './user/user.component';
import { PostThreadComponent } from './detailed-section/post-thread/post-thread.component';
import { PostReplyComponent } from './thread/post-reply/post-reply.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SectionComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    DetailedSectionComponent,
    ThreadComponent,
    UserComponent,
    PostThreadComponent,
    PostReplyComponent,
    ConfirmationDialogComponent,
    NotificationDialogComponent
  ],
  entryComponents: [
    PostThreadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
