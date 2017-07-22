import { Component, OnInit, Output } from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLiveActive = false;

  constructor() {
  }

  ngOnInit() {
  }

  startStream(){
    this.isLiveActive = !this.isLiveActive;
  }
}
