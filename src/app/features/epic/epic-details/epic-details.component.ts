import { Component, OnInit } from '@angular/core';
import { Epic } from 'src/models/epic';
import { EpicService } from '../services/epic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Story } from 'src/models/story';
import { StoryService } from '../../story/services/story.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-epic-details',
  templateUrl: './epic-details.component.html',
  styleUrls: ['./epic-details.component.scss'],
})
export class EpicDetailsComponent implements OnInit {
  epic: Epic | undefined;
  storyList: Story[] = [];
  storyListDone: Story[] = [];
  storyListRunning: Story[] = [];
  storyListTodo: Story[] = [];

  constructor(
    private epicService: EpicService,
    private storyService: StoryService,
    private router: Router,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit() {
    let epicId = this.activatedRouteService.snapshot.paramMap.get('epic-id');
    if (epicId) {
      this.epicService
        .getEpic$(epicId)
        .subscribe((epic) => (this.epic = epic.data));

      this.storyService.getStories$(epicId).subscribe((stories) => {
        this.storyList = stories.data;
        this.storyListDone = this.storyList.filter(
          (story) => story.status == 'done'
        );
        this.storyListRunning = this.storyList.filter(
          (story) => story.status == 'running'
        );
        this.storyListTodo = this.storyList.filter(
          (story) => story.status == 'todo'
        );
      });
    }
  }

  handleStorySelection(storyId: string) {
    this.router.navigate([storyId], {
      relativeTo: this.activatedRouteService,
    });
  }
}
