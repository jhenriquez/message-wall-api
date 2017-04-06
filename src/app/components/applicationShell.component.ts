import { Component, OnInit } from '@angular/core';
import { WallMessage }       from "../models/WallMessage";

@Component({
  selector: 'application-shell',
  templateUrl: '/components/applicationShell.tpl.html'
})
export class ApplicationShellComponent implements OnInit {
    private canPublishMessages = false;
    private isLoadingUser = true;
    private noUser = false;

    messages: WallMessage[] = [];

    ngOnInit(): void {

      setTimeout(() => {
        this.isLoadingUser = false;
        this.canPublishMessages = true;
      }, 1000);

    }
}