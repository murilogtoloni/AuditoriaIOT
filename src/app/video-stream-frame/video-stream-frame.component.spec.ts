import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStreamFrameComponent } from './video-stream-frame.component';

describe('VideoStreamFrameComponent', () => {
  let component: VideoStreamFrameComponent;
  let fixture: ComponentFixture<VideoStreamFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoStreamFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoStreamFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
