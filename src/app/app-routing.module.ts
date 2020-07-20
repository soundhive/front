import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './components/album/album.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FavoriteTracksComponent } from './components/favorite-tracks/favorite-tracks.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { MyAlbumsComponent } from './components/my-albums/my-albums.component';
import { MyTracksComponent } from './components/my-tracks/my-tracks.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { UserEditComponent } from './components/user-profile/user-edit/user-edit.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AlbumTracksResolve } from './resolves/album-tracks.resolve';
import { AlbumResolve } from './resolves/album.resolve';
import { ChartingTracksResolve } from './resolves/charting-tracks.resolve';
import { HomeAlbumsResolve } from './resolves/home-albums.resolve';
import { HomeTracksResolve } from './resolves/home-tracks.resolve';
import { HomeUsersResolve } from './resolves/home-users.resolve';
import { MyAlbumsResolve } from './resolves/my-albums.resolve';
import { MyTracksResolve } from './resolves/my-tracks.resolve';
import { UserAlbumsResolve } from './resolves/user-albums.resolve';
import { UserFavoriteTracksResolve } from './resolves/user-favorite-tracks.resolve';
import { FollowedUsersTracksResolve } from './resolves/user-followed-tracks.resolve';
import { UserFollowingsResolve } from './resolves/user-followings.resolve';
import { UserHistoryResolve } from './resolves/user-history.resolve';
import { UserTracksResolve } from './resolves/user-tracks.resolve';
import { UserResolve } from './resolves/user.resolve';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
    canActivate: [AuthGuard],
  },
  {
    path: 'user/:username',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolve,
      tracks: UserTracksResolve,
      albums: UserAlbumsResolve,
    },
  },
  {
    path: 'settings',
    component: UserEditComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolve,
    },
  },
  {
    path: 'my-albums',
    component: MyAlbumsComponent,
    canActivate: [AuthGuard],
    resolve: {
      albums: MyAlbumsResolve,
    },
  },
  {
    path: 'my-tracks',
    component: MyTracksComponent,
    canActivate: [AuthGuard],
    resolve: {
      tracks: MyTracksResolve,
    },
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    canActivate: [AuthGuard],
    resolve: {
      followedUsers: UserFollowingsResolve,
      tracks: FollowedUsersTracksResolve,
    },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: {
      users: HomeUsersResolve,
      tracks: HomeTracksResolve,
      albums: HomeAlbumsResolve,
    },
  },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  {
    path: 'album/:id',
    component: AlbumComponent,
    canActivate: [AuthGuard],
    resolve: {
      album: AlbumResolve,
      tracks: AlbumTracksResolve,
    },
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuard],
    resolve: {
      listenings: UserHistoryResolve,
    },
  },
  {
    path: 'charts',
    component: ChartsComponent,
    canActivate: [AuthGuard],
    resolve: {
      tracks: ChartingTracksResolve,
    },
  },
  {
    path: 'favorites',
    component: FavoriteTracksComponent,
    canActivate: [AuthGuard],
    resolve: {
      favorites: UserFavoriteTracksResolve,
    },
  },
  { path: '404', component: PageNotFoundComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
