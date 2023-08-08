import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Story } from 'src/models/story';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  storyList: Story[] = [];
  storyList$: BehaviorSubject<Story[]>;
  story$: BehaviorSubject<Story>;
  constructor() {
    this.storyList = [
      {
        _id: '318161635116165',
        name: 'Story11111',
        description: 'Goddamn this story should be an epic',
        icon: '💺',
        owner: '326456165456161',
        epic: '88446416161616',
      },
      {
        _id: '548923023747982',
        name: 'Story222222',
        description: 'And this should be a task',
        icon: '🗼',
        owner: '326456165456161',
        epic: '978946354532215',
      },
    ];

    this.storyList$ = new BehaviorSubject<Story[]>(this.storyList);

    this.story$ = new BehaviorSubject<Story>({
      _id: 'def',
      name: 'def',
      description: 'def',
      icon: 'def',
      owner: 'def',
      epic: 'def',
    });
  }

  getStories(epicId: string) {
    return this.storyList$.asObservable();
  }

  getStory(storyId: string) {
    this.story$.next(this.storyList.filter((s) => s._id == storyId)[0]);

    return this.story$.asObservable();
  }
}