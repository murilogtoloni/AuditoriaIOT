import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-stream-frame',
  templateUrl: './video-stream-frame.component.html',
  styleUrls: ['./video-stream-frame.component.css']
})
export class VideoStreamFrameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  playVideo() {
    // if(this.videoElement.paused) {
    //   this.videoElement.play();
    //   this.isPlaying = true;
    // } else {
    //   this.videoElement.pause();
    //   this.isPlaying = false;
  // }
  };



}
