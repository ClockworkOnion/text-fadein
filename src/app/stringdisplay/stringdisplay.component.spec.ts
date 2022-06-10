import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringdisplayComponent } from './stringdisplay.component';

describe('StringdisplayComponent', () => {
  let component: StringdisplayComponent;
  let fixture: ComponentFixture<StringdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StringdisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
