import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  user: User = new User();
  error: string;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {}

  login() {
    this.authService.signIn(this.user).subscribe(
      (res: any) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('username', this.user.username);
        this.router.navigate(['user/' + this.user.username]);
      },
      (err) => {
        this.error = err.message;
      },
    );
  }
}
