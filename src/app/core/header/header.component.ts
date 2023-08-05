import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentRoute: string[] = [];

  constructor(private r: Router) {}

  ngOnInit() {
    this.r.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        let cr = event.urlAfterRedirects.split('/');
        cr.shift();
        this.currentRoute = cr;
      }
    });
  }
}
