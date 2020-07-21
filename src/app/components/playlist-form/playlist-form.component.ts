import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from '../../models/playlist';
import { AlertService } from '../../services/alert.service';
import { PlaylistsService } from '../../services/playlists.service';
import { requiredFileType } from '../../shared/required-file-type';

@Component({
  selector: 'app-new-playlist',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.scss'],
})
export class PlaylistFormComponent implements OnInit {
  playlist: Playlist;
  playlistsForm: FormGroup;
  requiredFieldAlert = 'This field is required';
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  isNewPlaylistForm = true;

  constructor(
    private formBuilder: FormBuilder,
    private playlistsService: PlaylistsService,
    public alertService: AlertService,
    public router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initPlaylistsForm();
  }

  initPlaylistsForm() {
    if (
      this.route.snapshot.url.length >= 3 &&
      this.route.snapshot.url[2].path === 'edit'
    ) {
      this.isNewPlaylistForm = false;

      const id = this.route.snapshot.paramMap.get('id');

      this.playlistsService.getPlaylist(id).subscribe((res: Playlist) => {
        this.playlist = res;
        this.playlistsForm = this.formBuilder.group({
          title: [this.playlist.title, Validators.required],
          description: [
            this.playlist.description,
            [Validators.required, Validators.maxLength(500)],
          ],
          coverImageFile: [null, requiredFileType(['png', 'jpg', 'jpeg'])],
        });
      });
    } else {
      this.playlistsForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', [Validators.required, Validators.maxLength(500)]],
        coverImageFile: [
          null,
          [Validators.required, requiredFileType(['png', 'jpg', 'jpeg'])],
        ],
      });
    }
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
    formData.append('tracks', '[]');

    if (this.isNewPlaylistForm) {
      formData.append('cover_file', submittedCoverFile);
      this.playlistsService.createPlaylist(formData).subscribe(
        (res) => {
          if (res) {
            this.playlistsService.addPlaylistToSidebar(res);
            this.router.navigate(['/playlists/', res.id]);
            this.alertService.success(
              'New playlist successfully created!',
              this.options,
            );
          }
        },
        (err) => {
          this.alertService.error(err.message, this.options);
        },
      );
    } else {
      if (submittedCoverFile) {
        formData.append('cover_file', submittedCoverFile);
      }
      this.playlistsService
        .updatePlaylist(formData, this.playlist.id)
        .subscribe(
          (res) => {
            if (res) {
              this.router.navigate(['/playlists/', res.body.id]);
              this.alertService.success(
                'This playlist has been successfully updated!',
                this.options,
              );
            }
          },
          (err) => {
            this.alertService.error(err.message, this.options);
          },
        );
    }
  }
}
