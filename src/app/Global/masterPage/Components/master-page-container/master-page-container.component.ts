import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-page-container',
  templateUrl: './master-page-container.component.html',
  styleUrls: ['./master-page-container.component.css']
})
export class MasterPageContainerComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver) {}

  isSidenavExpanded = false;

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        // Screen size is below 767px
        this.isSidenavExpanded = false;
      } else {
        // Screen size is above 767px
        this.isSidenavExpanded = true;
      }
    });
  }

  toggleSidenav(): void {
    this.isSidenavExpanded = !this.isSidenavExpanded;
  }
}