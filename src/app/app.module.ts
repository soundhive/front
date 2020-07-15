import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppRoutingModule } from './app-routing.module';
import { AlertModule } from './components/_alert';

import { AppComponent } from './app.component';
import { AlbumPreviewComponent } from './components/album-preview/album-preview.component';
import { AlbumComponent } from './components/album/album.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FavoriteTracksComponent } from './components/favorite-tracks/favorite-tracks.component';
import { HeaderComponent } from './components/header/header.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { MyAlbumsComponent } from './components/my-albums/my-albums.component';
import { MyTracksComponent } from './components/my-tracks/my-tracks.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewPlaylistComponent } from './components/new-playlist/new-playlist.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlayerComponent } from './components/player/player.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { TrackComponent } from './components/track/track.component';
import { UserEditComponent } from './components/user-profile/user-edit/user-edit.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { DateAgoPipe } from './pipes/date-ago.pipe';
import { SecondsToMinutesPipe } from './pipes/seconds-to-minutes.pipe';
import { AuthInterceptor } from './shared/authconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    TrackComponent,
    AlbumPreviewComponent,
    PlayerComponent,
    SecondsToMinutesPipe,
    HistoryComponent,
    DateAgoPipe,
    ChartsComponent,
    FavoriteTracksComponent,
    UserEditComponent,
    AlbumComponent,
    MyAlbumsComponent,
    MyTracksComponent,
    SubscriptionsComponent,
    PlaylistComponent,
    PlaylistsComponent,
    NewPlaylistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    CommonModule,
    AlertModule,
    NgxAudioPlayerModule,
    PaginationModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
