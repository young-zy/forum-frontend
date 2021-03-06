import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Thread } from '../core/entity/thread';
import { ThreadService } from '../core/services/thread/thread.service';
import { Response } from '../core/entity/response';
import { delay } from 'rxjs/operators';
import { DialogData, PostReplyComponent } from './post-reply/post-reply.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../core/entity/user';
import { UserService } from '../core/services/user/user.service';
import { Reply } from '../core/entity/reply';
import { ReplyService } from '../core/services/reply/reply.service';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  private threadId: number;
  thread: Thread;
  threadObservable: Observable<Response>;
  user: User;
  private page: number;
  private savedForm: DialogData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private threadService: ThreadService,
    private userService: UserService,
    private replyService: ReplyService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .subscribe(
        data => {
          this.threadId = parseInt(data[0].get('threadId'), 10);
          this.page = parseInt(data[1].get('page') || '1', 10);
          this.savedForm = {
            state: false,
            threadId: this.threadId,
            content: ''
          };
          this.threadObservable = this.threadService.getThread(this.threadId, this.page);
          this.threadObservable
            .subscribe(
              response => {
                this.thread = response.thread;
              },
              error => {
                if (error.status === 404){
                  this.router.navigate(['/NotFound'], { skipLocationChange: true }).then();
                }
                console.log(error);
              }
            );
        }
      );
    this.userService.selfInfo.subscribe(
      user => this.user = user
    );
  }

  openPostDialog(): void{
    if (!this.user){
      console.log('not logged in');
      // TODO show snackbar
      return;
    }
    this.savedForm.threadId = this.threadId;
    const dialogRef = this.dialog.open(PostReplyComponent, {
      data: this.savedForm
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result && result.state){
        this.replyService.postReply(
          result.threadId, result.content
        ).subscribe(
          () => {
            delay(1000);
            this.ngOnInit();
          },
          error => {
            console.log(error);
            result.state = false;
            this.dialog.open(PostReplyComponent, {
              data: result
            });
          }
        );
      }else{
        this.savedForm = result ? result : this.savedForm;
      }
      console.log(`The dialog was closed with result ${result}`);
    });
  }

  upVoteClicked(reply: Reply): void {
    const state = reply.vote;
    const upVote = reply.upVote;
    if (reply.vote === -1){
      return;
    }else if (reply.vote === 1){
      reply.upVote--;
      reply.vote = 0;
    }else{
      reply.upVote++;
      reply.vote = 1;
    }
    this.replyService.vote(reply.replyId, reply.vote).subscribe(
      () => {},
      error => {
        reply.vote = state;
        reply.upVote = upVote;
        console.log(error);
      }
    );
  }

  downVoteClicked(reply: Reply): void {
    const state = reply.vote;
    if (reply.vote === 1){
      return;
    }else if (reply.vote === -1){
      reply.vote = 0;
    }else{
      reply.vote = -1;
    }
    this.replyService.vote(reply.replyId, reply.vote).subscribe(
      () => {},
      error => {
        reply.vote = state;
        console.log(error);
      }
    );
  }

  updateClicked(reply: Reply): void{
    const dialogRef = this.dialog.open(PostReplyComponent, {
      data: {
        content: reply.replyContent
      }
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result.state){
        this.replyService.updateReply(
          reply.replyId, result.content
        ).subscribe(
          () => {
            delay(1000);
            this.ngOnInit();
          },
          error => {
            console.log(error);
            result.state = false;
          }
        );
      }
      console.log(`The dialog was closed with result ${result}`);
    });
  }

  deleteClicked(replyId: number): void{
    const dialogData: ConfirmationDialogData = {
      message: '是否要删除该回复？'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.replyService.deleteReply(
          replyId
        ).subscribe(
          () => {
            delay(2000);
            this.ngOnInit();
          },
          error => {
            console.log(error);
          }
        );
      }
      console.log(`The dialog was closed with result ${result}`);
    });
  }

  isAdmin(): boolean{
    if (!this.user){
      return false;   // not logged in
    } else if (this.user.auth.systemAdmin){
      return true;
    } else {
      return this.user.auth.sectionAdmin && this.thread.sectionId in this.user.auth.sections;
    }
  }
}
