import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AuthGuard } from './shared/auth.guard';
import { UserResolve } from './resolves/user.resolve';
import { UserTracksResolve } from './resolves/user-tracks.resolve';
import { UserAlbumsResolve } from './resolves/user-albums.resolve';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

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
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolve,
      tracks: UserTracksResolve,
      albums: UserAlbumsResolve,
    },
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: '404', component: PageNotFoundComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
