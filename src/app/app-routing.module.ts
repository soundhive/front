import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home', canActivate: [AuthGuard]  },
  { path: 'user-profile/:username', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent,  canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: '404', component: PageNotFoundComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
