import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
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

// Components
import { TopbarComponent, UpLoadContentDialogComponent, LoginDialogComponent } from './topbar/topbar.component';
import { ComponentPost } from './post/post.component';
import { LoadingComponent } from './tools/loading/loading';

// Views
import { ViewAbout } from './views/about/about.component';
import { ViewChannel } from './views/channel/channel.component';
import { ViewRegister } from './views/register/register.component';
import { ViewList } from './views/channel/list/list.component';
import { ViewGrid } from './views/channel/grid/grid.component';
import { ViewPost } from './views/post/post.component';

// Services
import { ContentService } from './services/content.service';
import { ChannelService } from './services/channel.service';
import { SessionBus } from './services/sessionbus.service';
import { ToolsService } from './tools/tools';
import { AuthService } from './services/auth.service';


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
  },
  { 
    path: 'ch/:channel/:post',
    component: ViewPost
  }     
];


@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    ComponentPost,
    ViewAbout,
    ViewChannel,
    ViewRegister,
    ViewList,
    ViewGrid,
    ViewPost,
    UpLoadContentDialogComponent,
    LoginDialogComponent,
    LoadingComponent
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
  providers: [ ContentService, ChannelService, SessionBus, ToolsService, AuthService ],
  bootstrap: [AppComponent],
  entryComponents: [
    UpLoadContentDialogComponent,
    LoginDialogComponent,
    LoadingComponent
  ]
})
export class AppModule { }
