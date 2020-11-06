import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { TopbarComponent } from './topbar/topbar.component';
import 'hammerjs';
// Mat
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Views
import { ViewAbout } from './views/about/about.component';
import { ViewChannel } from './views/channel/channel.component';
import { ViewRegister } from './views/register/register.component';
import { ViewPost } from './views/post/post.component';
import { ViewList } from './views/channel/list/list.component';
import { ViewGrid } from './views/channel/grid/grid.component';
// Services
import { ContentService } from './services/content.service';
import { ChannelService } from './services/channel.service';
import { SessionBus } from './services/sessionbus.service';


const appRoutes: Routes = [
  { 
    path: 'about',
    component: ViewAbout
  },
  { 
    path: 'ch/:channel',
    component: ViewChannel
  },
  { 
    path: 'register',
    component: ViewRegister
  }    
];


@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    ViewAbout,
    ViewChannel,
    ViewRegister,
    ViewList,
    ViewGrid,
    ViewPost
  ],
  imports: [
    HttpModule,
    HttpClientModule,    
    BrowserModule,
    AppRoutingModule,
    // Mat
    BrowserAnimationsModule,
    MatTooltipModule,
    MatMenuModule,
    MatSliderModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [ ContentService, ChannelService, SessionBus ],
  bootstrap: [AppComponent]
})
export class AppModule { }
