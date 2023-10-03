import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMessageCardComponent } from './profile-message-card.component';

describe('ProfileMessageCardComponent', () => {
  let component: ProfileMessageCardComponent;
  let fixture: ComponentFixture<ProfileMessageCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileMessageCardComponent]
    });
    fixture = TestBed.createComponent(ProfileMessageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
