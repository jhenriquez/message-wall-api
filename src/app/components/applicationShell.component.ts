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
    private isLoadingMessages = true;

    messages: WallMessage[];

    ngOnInit(): void {

      setTimeout(() => {
        this.isLoadingUser = false;
        this.canPublishMessages = false;
        this.noUser = true;
      }, 1000);

      setTimeout(() => {
        this.isLoadingMessages = false;
        this.messages = [
          {
            id: 'aa2c200af039c055f27c0ddcb1446300',
            text: 'This is a test message fucker!',
            author: {
              id: 'aa2c200af039c055f27c0ddcb1446300',
              email: 'julio.m.henriquez@gmail.com',
              emailHash: 'aa91653890590b5ac741b52e8cfaa9b1',
              name: 'Julio Henriquez'
             }
          }
        ];
      },1000);

    }
}