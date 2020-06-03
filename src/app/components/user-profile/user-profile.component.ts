import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../shared/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  currentUser: User;

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    const username = this.actRoute.snapshot.paramMap.get('username');
    this.authService.getUserProfile(username).subscribe(res => {
      this.currentUser = res;
    });
  }

  ngOnInit() { }
}
