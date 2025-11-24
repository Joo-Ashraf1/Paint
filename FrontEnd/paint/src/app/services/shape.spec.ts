import { TestBed } from '@angular/core/testing';

import { ShapeService } from './shape';

describe('Shape', () => {
  let service: ShapeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
