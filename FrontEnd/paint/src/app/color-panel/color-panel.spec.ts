import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPanel } from './color-panel';

describe('ColorPanel', () => {
  let component: ColorPanel;
  let fixture: ComponentFixture<ColorPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
