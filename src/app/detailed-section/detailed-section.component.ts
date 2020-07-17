import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../core/entity/section';
import { SectionService } from '../core/services/section/section.service';
import { combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, PostThreadComponent } from './post-thread/post-thread.component';
import { User } from '../core/entity/user';
import { UserService } from '../core/services/user/user.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-detailed-section',
  templateUrl: './detailed-section.component.html',
  styleUrls: ['./detailed-section.component.scss']
})
export class DetailedSectionComponent implements OnInit {

  public sectionId: number;
  public page: number;

  public section: Section;

  private user: User;
  private savedForm: DialogData;

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .subscribe(
        data => {
          this.sectionId = parseInt(data[0].get('sectionId'), 10);
          this.page = parseInt(data[1].get('page') || '1', 10);
          this.savedForm = {
            sectionId: this.sectionId,
            title: '',
            content: '',
            isQuestion: true
          };
          this.sectionService.getSection(this.sectionId, this.page)
            .subscribe(
            result => {
              this.section = result.section;
              if (this.page > this.section.totalPage || this.page < 1){
                this.router.navigate(['/NotFound'], { skipLocationChange: true }).then();
              }
            },
            error => {
              if (error.status === 404 || error.status === 400){
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

  threadClick(threadId: number): void{
    this.router.navigate([`/thread/${threadId}`],
      {
        queryParams: {
          page: 1
        }
      }
    ).then();
  }

  avatarClicked(userId: number): void{
    this.router.navigate([`/user/${userId}`]).then();
  }

  nextPage(): void{
    this.router.navigate([`/section/${this.sectionId}`], {
      queryParams: {
        page: this.page + 1
      }
    }).then();
  }

  previousPage(): void{
    this.router.navigate([`/section/${this.sectionId}`], {
      queryParams: {
        page: this.page - 1
      }
    }).then();
  }

  openDialog(): void{
    if (!this.user){
      console.log('not logged in');
      // TODO show snackbar
      return;
    }
    this.savedForm.sectionId = this.sectionId;
    const dialogRef = this.dialog.open(PostThreadComponent, {
      data: this.savedForm
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true){
        delay(1000);
        this.ngOnInit();
      }else{
        this.savedForm = result ? result : this.savedForm;
      }
      console.log(`The dialog was closed with result ${result}`);
    });
  }
}
