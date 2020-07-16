import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../entity/user';
import { Observable, ReplaySubject } from 'rxjs';
import { Response } from '../../entity/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private selfInfoSource = new ReplaySubject<User>(1);

  selfInfo = this.selfInfoSource.asObservable();

  constructor(private http: HttpClient) { }

  getSelf(): Observable<Response> {
    if (!window.localStorage.getItem('token')){         // if token does not exist, return
      return null;
    }
    const self = this.http.get<Response>(`${environment.base_url}/user`);
    self.subscribe(
      data => {
        this.selfInfoSource.next(data.user);
      },
      error => {                                  // if token exists but expired
        console.log(error);
        this.clearToken();
      }
    );
    return self;
  }

  getUser(uid: number): Observable<Response>{
    return this.http.get<Response>(`${environment.base_url}/user/${uid}`);
  }

  logout(): void{
    if (window.localStorage.getItem('token')){
      this.selfInfoSource.next(null);
      this.clearToken();
      this.http.post(`${environment.base_url}/user/logout`, {});
    }
  }

  clearToken(): void{
    window.localStorage.removeItem('token');
  }

  login(loginForm: any): Observable<any>{
    const res = this.http.post<Response>(`${environment.base_url}/user/login`, JSON.stringify(loginForm));
    res.subscribe(
      data => {
        const token = data.token;
        window.localStorage.setItem('token', token);
        this.getSelf();
      }
    );
    return res;
  }

  register(registerForm: any): Observable<any>{
    const res = this.http.post(`${environment.base_url}/user`,
      {
        email: registerForm.email,
        username: registerForm.username,
        password: registerForm.password
      });
    res.subscribe(
      () => {
        this.login(
          {
            username: registerForm.username,
            password: registerForm.password
          }
        );
      }
    );
    return res;
  }

  updateUserInfo(user: any): Observable<any>{
    return this.http.put(`${environment.base_url}/user`, {
      username: user.username || null,
      password: user.password,
      email: user.email || null,
      newPassword: user.newPassword
    });
  }

  getAllUser(page: number, size: number): Observable<Response>{
    return this.http.get<Response>(`${environment.base_url}/user/all`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }
}
