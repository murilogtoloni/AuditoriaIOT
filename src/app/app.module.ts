import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VideoStreamFrameComponent } from './video-stream-frame/video-stream-frame.component';
import { LiveChatComponent } from './live-chat/live-chat.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    VideoStreamFrameComponent,
    LiveChatComponent
  ],
  imports: [
    CommonModule, 
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent,NavBarComponent]
})
export class AppModule { }
