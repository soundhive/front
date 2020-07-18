import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  s3Bucket: string;
  s3Endpoint: string;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private router: Router,
  ) {
    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
    this.userService.getUser(authService.username).subscribe((res) => {
      this.currentUser = res;
    });
  }

  ngOnInit(): void {}

  logout() {
    this.authService.doLogout();
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }
}
