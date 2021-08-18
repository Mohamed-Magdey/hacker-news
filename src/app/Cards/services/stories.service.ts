import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from '../../../environments/environment';
// import {environment} from '../../../environments/environment.prod';
import {Stories} from '../models/stories';
import {Story} from '../models/story';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllStories(): Observable<Stories[]> {
    return this.http.get<Stories[]>(`${environment.apiUrl}/topstories.json`)
  }

  getStory(id: number): Observable<Story>{
    return this.http.get<Story>(`${environment.apiUrl}/item/${id}.json`)
  }
}
