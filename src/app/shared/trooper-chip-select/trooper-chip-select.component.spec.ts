import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrooperChipSelectComponent } from './trooper-chip-select.component';

describe('TrooperChipSelectComponent', () => {
  let component: TrooperChipSelectComponent;
  let fixture: ComponentFixture<TrooperChipSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrooperChipSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrooperChipSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
