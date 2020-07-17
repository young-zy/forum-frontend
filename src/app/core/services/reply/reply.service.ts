import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../entity/response';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor(
    private http: HttpClient
  ) { }

  getReply(replyId: number): Observable<Response>{
    return this.http.get<Response>(`${environment.base_url}/reply/${replyId}`);
  }

  postReply(threadId: number, replyContentParam: string): Observable<any>{
    return this.http.post(
      `${environment.base_url}/thread/${threadId}/reply`,
      {
        replyContent: replyContentParam
      }
    );
  }

  vote(replyId: number, state: number): Observable<any>{          // state should be in body
    return this.http.put(
      `${environment.base_url}/reply/${replyId}/vote`,
      {},
      {
        params: {
          state: state.toString()
        }
      }
    );
  }

  updateReply(replyId: number, reply: string): Observable<any>{
    return this.http.put(
      `${environment.base_url}/reply/${replyId}`,
      {
        replyContent: reply
      }
    );
  }

  deleteReply(replyId: number): Observable<any>{
    return this.http.delete(
      `${environment.base_url}/reply/${replyId}`,
    );
  }
}
