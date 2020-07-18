import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './components/charts/charts.component';
import { FavoriteTracksComponent } from './components/favorite-tracks/favorite-tracks.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserEditComponent } from './components/user-profile/user-edit/user-edit.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChartingTracksResolve } from './resolves/charting-tracks.resolve';
import { UserAlbumsResolve } from './resolves/user-albums.resolve';
import { UserFavoriteTracksResolve } from './resolves/user-favorite-tracks.resolve';
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
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
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
