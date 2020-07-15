import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSectionComponent } from './detailed-section.component';

describe('DetailedSectionComponent', () => {
  let component: DetailedSectionComponent;
  let fixture: ComponentFixture<DetailedSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
