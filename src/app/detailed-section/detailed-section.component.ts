import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../core/entity/section';
import { SectionService } from '../core/services/section/section.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-detailed-section',
  templateUrl: './detailed-section.component.html',
  styleUrls: ['./detailed-section.component.scss']
})
export class DetailedSectionComponent implements OnInit {

  public sectionId: number;
  public page: number;

  public section: Section;

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .subscribe(
        data => {
          this.sectionId = parseInt(data[0].get('sectionId'), 10);
          this.page = parseInt(data[1].get('page') || '1', 10);
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
}
