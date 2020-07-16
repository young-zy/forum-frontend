import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReplyService } from '../../core/services/reply/reply.service';

export interface DialogData {
  threadId: number;
  content: string;
}

@Component({
  selector: 'app-post-reply',
  templateUrl: './post-reply.component.html',
  styleUrls: ['./post-reply.component.scss']
})
export class PostReplyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PostReplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private replyService: ReplyService,
    private formBuilder: FormBuilder
  ) { }

  postReplyForm = this.formBuilder.group({
    content: [this.data.content, [Validators.required]]
  });

  onCancelClick(): void{
    this.data.content = this.contentControl.value;
    this.dialogRef.close(this.data);
  }

  get contentControl(): FormControl{
    return this.postReplyForm.get('content') as FormControl;
  }

  onSubmitClick(): void{
    if (!this.postReplyForm.valid){
      return;
    }
    const reply = {
      replyContent: this.contentControl.value,
    };
    this.replyService.postReply(
      this.data.threadId, reply
    ).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('80%', '70%');
  }

}
