import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { S3Service } from 'src/app/services/s3.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser = new User();

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private router: Router,
    public s3Service: S3Service,
  ) {
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
