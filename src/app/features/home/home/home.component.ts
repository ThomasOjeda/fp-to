import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  map,
  fromEvent,
  startWith,
  debounceTime,
  distinctUntilChanged,
  Subscription,
} from 'rxjs';
import { SearchService } from '../services/search.service';
import { Project } from 'src/models/project';
import { SearchResult } from '../../../../models/search-result';
import { Router } from '@angular/router';
import { EpicService } from '../../epic/services/epic.service';
import { StoryService } from '../../story/services/story.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef;

  search: string = '';
  searchType: string = 'projects';
  searchInputSubscription: Subscription = new Subscription();
  searchServiceSubscription: Subscription = new Subscription();

  searchResults: SearchResult[] = [];

  proyres: Project[] = [];

  constructor(
    private searchService: SearchService,
    private epicService: EpicService,
    private storyService: StoryService,
    private routerService: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.searchInputSubscription = fromEvent<KeyboardEvent>(
      this.searchInput.nativeElement,
      'keyup'
    )
      .pipe(
        map((event) => {
          if (event.target) return (event.target as HTMLInputElement).value;
          return '';
        }),
        startWith(''),
        debounceTime(600),
        distinctUntilChanged()
      )
      .subscribe((value) => this.searchFor(value));
  }

  handleSelectorChanged() {
    this.searchFor(this.search);
  }

  searchFor(value: string) {
    this.searchResults = [];
    this.searchServiceSubscription.unsubscribe();
    this.searchServiceSubscription = this.searchService
      .search(value, this.searchType)
      .subscribe((results) => (this.searchResults = results));
  }

  handleElementClick(clicked: SearchResult) {
    switch (clicked.type) {
      case 1:
        this.navigateToProject(clicked);
        break;
      case 2:
        this.navigateToEpic(clicked);
        break;
      case 3:
        this.navigateToStory(clicked);
        break;
      case 4:
        this.navigateToTask(clicked);
        break;

      default:
        break;
    }
  }

  navigateToProject(selectedProject: SearchResult) {
    this.routerService.navigate(['my-projects', selectedProject.data._id]);
  }

  navigateToEpic(selectedEpic: SearchResult) {
    this.routerService.navigate([
      'my-projects',
      selectedEpic.data.parent,
      selectedEpic.data._id,
    ]);
  }

  navigateToStory(selectedStory: SearchResult) {
    //Get the projectId of the epic that is the parent of this selected story
    this.epicService
      .getProjectId$(selectedStory.data.parent)
      .subscribe((projectId) => {
        this.routerService.navigate([
          'my-projects',
          projectId,
          selectedStory.data.parent,
          selectedStory.data._id,
        ]);
      });
  }

  navigateToTask(selectedTask: SearchResult) {
    //Get the epicId of the story that is the parent of this selected task
    this.storyService
      .getEpicId$(selectedTask.data.parent)
      .subscribe((epicId) => {
        //Get the projectId of the epic
        this.epicService.getProjectId$(epicId).subscribe((projectId) => {
          this.routerService.navigate([
            'my-projects',
            projectId,
            epicId,
            selectedTask.data.parent,
            selectedTask.data._id,
          ]);
        });
      });
  }

  ngOnDestroy(): void {
    this.searchInputSubscription.unsubscribe();
    this.searchServiceSubscription.unsubscribe();
  }
}
