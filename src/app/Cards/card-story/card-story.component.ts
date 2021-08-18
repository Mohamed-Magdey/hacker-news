import { Component, OnInit } from '@angular/core';
import {forkJoin} from 'rxjs';

import {StoriesService} from '../services/stories.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-card-story',
  templateUrl: './card-story.component.html',
  styleUrls: ['./card-story.component.scss']
})
export class CardStoryComponent implements OnInit {
  public stories: Array<any> = [];
  public users: Array<any> = [];

  constructor(
    private storiesService: StoriesService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.storiesService.getAllStories().subscribe(val => {
      this.stories = val;
      this.stories = this.getRandom(this.stories, 10);

      forkJoin(
        this.stories.map((item: number) => this.storiesService.getStory(item))
      ).subscribe(val => {
        this.stories = val.sort((a: any, b: any) => a.score - b.score)

        forkJoin(
          this.stories.map(user => this.userService.getUser(user.by))
        ).subscribe(val => {
          this.users = val;
        })
      });
      
    })
  }

  
  getRandom(arr: number[], n: number): number[] {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

}
