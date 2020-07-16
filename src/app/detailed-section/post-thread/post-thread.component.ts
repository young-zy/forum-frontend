import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThreadService } from '../../core/services/thread/thread.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

export interface DialogData {
  sectionId: number;
  title: string;
  content: string;
  isQuestion: boolean;
}

@Component({
  selector: 'app-post-thread',
  templateUrl: './post-thread.component.html',
  styleUrls: ['./post-thread.component.scss']
})
export class PostThreadComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PostThreadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private threadService: ThreadService,
    private formBuilder: FormBuilder
  ) { }

  postThreadForm = this.formBuilder.group({
    title: [this.data.title, [Validators.required]],
    content: [this.data.content, [Validators.required]]
  });

  get titleControl(): FormControl{
    return this.postThreadForm.get('title') as FormControl;
  }

  get contentControl(): FormControl{
    return this.postThreadForm.get('content') as FormControl;
  }


  ngOnInit(): void {
    this.dialogRef.updateSize('80%', '70%');
  }

  onCancelClick(): void{
    this.data.title = this.titleControl.value;
    this.data.content = this.contentControl.value;
    this.dialogRef.close(this.data);
  }

  onSubmitClick(): void{
    if (!this.postThreadForm.valid){
      return;
    }
    const thread = {
      sectionId: this.data.sectionId,
      title: this.titleControl.value,
      content: this.contentControl.value,
      isQuestion: true
    };
    this.threadService.postThread(
      thread
    ).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      error => {
        console.log(error);
      }
    );
  }
}
