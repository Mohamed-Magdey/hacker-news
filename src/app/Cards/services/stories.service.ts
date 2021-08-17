import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import {Stories} from '../models/stories';


@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllStories(): Observable<Stories[]> {
    return this.http.get<Stories[]>('https://hacker-news.firebaseio.com/v0/topstories.json')
  }
}
