import { TestBed } from '@angular/core/testing';
import { roundToNearestFive, sumOf } from './number-utils';

describe('NumberUtils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should round to nearest five', () => {
    expect(roundToNearestFive(0)).toEqual(0);
    expect(roundToNearestFive(0.99)).toEqual(1.0);
    expect(roundToNearestFive(1.0)).toEqual(1.0);
    expect(roundToNearestFive(1.01)).toEqual(1.05);
    expect(roundToNearestFive(1.02)).toEqual(1.05);
    expect(roundToNearestFive(1.05)).toEqual(1.05);
    expect(roundToNearestFive(1.09)).toEqual(1.1);
  });

  it('should sum the numbers in the array', () => {
    expect(sumOf([])).toEqual(0);
    expect(sumOf([1, 2, 3])).toEqual(6);
  });
});
