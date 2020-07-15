import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaylistsService } from '../../services/playlists.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.scss'],
})
export class NewPlaylistComponent implements OnInit {
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
    });
  }

  resetForm() {
    this.playlistsForm.reset();
  }

  onSubmitPlaylistsForm() {
    const newPlaylist = this.playlistsForm.value;
    this.playlistsService.create(newPlaylist);
    this.router.navigate(['home']);
    this.alertService.success(
      'New playlist successfully created !!',
      this.options,
    );
  }
}
