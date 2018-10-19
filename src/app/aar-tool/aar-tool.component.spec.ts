import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AarToolComponent } from './aar-tool.component';

describe('AarToolComponent', () => {
  let component: AarToolComponent;
  let fixture: ComponentFixture<AarToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AarToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AarToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
