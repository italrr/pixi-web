import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { TopbarComponent } from './topbar/topbar.component';
// Views
import { ViewAbout } from './views/about/about.component';
import { ViewChannel } from './views/channel/channel.component';
// Services
import { ContentService } from './services/content.service';

const appRoutes: Routes = [
  { 
    path: 'about',
    component: ViewAbout
  },
  { 
    path: 'ch/:channel',
    component: ViewChannel
  }  
];


@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    ViewAbout,
    ViewChannel
  ],
  imports: [
    HttpModule,
    HttpClientModule,    
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )    
  ],
  providers: [ ContentService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
