import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errors: string[];

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  registerUser() {
    const selectedFileList = (document.getElementById(
      'profile_picture',
    ) as HTMLInputElement).files;
    const profilePicture = selectedFileList.item(0);

    const formData = new FormData();
    formData.append('name', this.signupForm.value.name);
    formData.append('username', this.signupForm.value.username);
    formData.append('email', this.signupForm.value.email);
    formData.append('password', this.signupForm.value.password);
    formData.append('profile_picture', profilePicture);

    this.authService.signUp(formData).subscribe(
      (res) => {
        if (res) {
          this.signupForm.reset();
          this.router.navigate(['login']);
        }
      },
      (err) => {
        this.errors = err.message;
      },
    );
  }
}
