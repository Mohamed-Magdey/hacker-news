import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

// import {environment} from '../../../environments/environment';
import {environment} from '../../../environments/environment.prod';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}.json`)
  }
}
