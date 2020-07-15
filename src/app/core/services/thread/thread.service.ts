import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../entity/response';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(private http: HttpClient) { }

  getThread(threadId: number, page: number): Observable<Response>{
    return this.http.get<Response>(`${environment.base_url}/thread/${threadId}`, {
      params: {
        page: page.toString()
      }
    });
  }

  postThread(thread: any): Observable<any>{
    return this.http.post<Response>(`${environment.base_url}/thread`, {
      sectionId: thread.sectionId,
      title: thread.title,
      content: thread.content,
      isQuestion: thread.isQuestion
    });
  }

  deleteThread(threadId: number): Observable<any>{
    return this.http.delete(
      `${environment.base_url}/thread/${threadId}`
    );
  }

  search(keyword: string, page: number, size: number): Observable<Response>{
    return this.http.get<Response>(
      `${environment.base_url}/search`,
      {
        params: {
          keyWord: keyword,
          page: page.toString(),
          size: size.toString()
        }
      }
    );
  }

  getHotThreads(count: number = 20): Observable<Response>{
    return this.http.get<Response>(`${environment.base_url}/thread/hot`, {
      params: {
        count: count.toString()
      }
    });
  }
}
