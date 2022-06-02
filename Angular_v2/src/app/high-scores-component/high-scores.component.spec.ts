import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighScoresComponentComponent } from './high-scores-component.component';

describe('HighScoresComponentComponent', () => {
  let component: HighScoresComponentComponent;
  let fixture: ComponentFixture<HighScoresComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighScoresComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighScoresComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
