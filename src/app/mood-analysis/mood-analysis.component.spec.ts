import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodAnalysisComponent } from './mood-analysis.component';

describe('MoodAnalysisComponent', () => {
  let component: MoodAnalysisComponent;
  let fixture: ComponentFixture<MoodAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodAnalysisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoodAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
