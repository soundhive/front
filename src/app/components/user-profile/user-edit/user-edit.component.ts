import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  currentUser: User;
  errors: string[];
  updated = false;

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    public router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.currentUser = this.route.snapshot.data.user;
    this.userForm = this.fb.group({
      name: [this.currentUser.name, Validators.required],
      username: [this.currentUser.username, Validators.required],
      email: [this.currentUser.email, Validators.required],
      password: [''],
    });
  }

  updateUser() {
    // Reset API error list
    this.errors = null;

    const selectedFileList = (document.getElementById(
      'profile_picture',
    ) as HTMLInputElement).files;
    const profilePicture = selectedFileList.item(0);

    const formData = new FormData();
    formData.append('name', this.userForm.value.name);
    formData.append('email', this.userForm.value.email);
    if (this.userForm.value.password) {
      formData.append('password', this.userForm.value.password);
    }
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    this.userService.updateUser(formData).subscribe(
      (res) => {
        if (res) {
          this.currentUser = res;
          this.updated = true;
        }
      },
      (err) => {
        console.log('errrr', err);
        this.errors = err.message;
      },
    );
  }
}
