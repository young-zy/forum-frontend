import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {Observable} from 'rxjs';
import { Response } from '../../entity/response';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(
    private http: HttpClient
  ) { }

  getSections(): Observable<Response>{
    return this.http.get<Response>(`${environment.base_url}/section`);
  }

  getSection(sectionId: number, pageNum: number = 1, sizeNum: number = 10): Observable<any>{
    return this.http.get<Response>(
      `${environment.base_url}/section/${sectionId}`,
      {
        params: {
          page: pageNum.toString(),
          size: sizeNum.toString()
        }
      }
    );
  }

  addSection(section: any): Observable<any>{
    return this.http.post(
      `${environment.base_url}/section`,
      {
        sectionName: section.sectionName
      }
    );
  }

  deleteSection(sectionId: number): Observable<any>{
    return this.http.delete(
      `${environment.base_url}/section/${sectionId}`,
      );
  }
}
