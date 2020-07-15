import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Thread } from '../core/entity/thread';
import { ThreadService } from '../core/services/thread/thread.service';
import { Response } from '../core/entity/response';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  private threadId: number;
  thread: Thread;
  threadObservable: Observable<Response>;
  private page: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private threadService: ThreadService
  ) { }

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .subscribe(
        data => {
          this.threadId = parseInt(data[0].get('threadId'), 10);
          this.page = parseInt(data[1].get('page') || '1', 10);
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

  }

}
