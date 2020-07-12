import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Section } from '../../entity/section';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(
    private http: HttpClient
  ) { }

  getSections(): Observable<any>{
    return this.http.get<Section>(`${environment.base_url}/section`);
  }
}
