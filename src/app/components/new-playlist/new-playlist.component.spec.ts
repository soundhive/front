import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlaylistComponent } from './new-playlist.component';

describe('NewPlaylistComponent', () => {
  let component: NewPlaylistComponent;
  let fixture: ComponentFixture<NewPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
