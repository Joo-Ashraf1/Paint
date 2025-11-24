import { TestBed } from '@angular/core/testing';

import { ColorToCanvas } from './color-to-canvas';

describe('ColorToCanvas', () => {
  let service: ColorToCanvas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorToCanvas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
