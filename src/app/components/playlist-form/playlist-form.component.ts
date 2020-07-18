import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaylistsService } from '../../services/playlists.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
// import { requiredFileType } from '../../shared/required-file-type';

@Component({
  selector: 'app-new-playlist',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.scss'],
})
export class PlaylistFormComponent implements OnInit {
  playlistsForm: FormGroup;
  requiredFieldAlert = 'This field is required';
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private playlistsService: PlaylistsService,
    public alertService: AlertService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.initPlaylistsForm();
  }

  initPlaylistsForm() {
    this.playlistsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
      coverImageFile: [
        null,
        // [
        Validators.required,
        // requiredFileType(['png', 'jpg', 'jpeg'])
        // ],
      ],
    });
  }

  isFormValid() {
    return this.playlistsForm.valid;
  }

  onSubmitPlaylistsForm() {
    const selectedFileList = (document.getElementById(
      'playlistCoverFileInput',
    ) as HTMLInputElement).files;
    const submittedCoverFile = selectedFileList.item(0);

    const formData = new FormData();
    formData.append('title', this.playlistsForm.value.title);
    formData.append('description', this.playlistsForm.value.description);
    formData.append('coverImageFile', submittedCoverFile);
    console.log(formData);

    this.playlistsService.createPlaylist(formData).subscribe(
      (res) => {
        if (res) {
          this.router.navigate(['home']);
          this.alertService.success(
            'New playlist successfully created !!',
            this.options,
          );
        }
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
