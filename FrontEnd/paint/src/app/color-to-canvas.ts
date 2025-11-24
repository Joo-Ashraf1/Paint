import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorToCanvas {

  private strokeWidthSource = new BehaviorSubject<number>(3);
  private strokeColorSource = new BehaviorSubject<string>('#000000');
  private fillColorSource   = new BehaviorSubject<string>('#ffffff');


  strokeWidth$ = this.strokeWidthSource.asObservable();
  strokeColor$ = this.strokeColorSource.asObservable();
  fillColor$   = this.fillColorSource.asObservable();

  // Methods to update the values (called by the color panel)
  setStrokeWidth(w: number) {
    this.strokeWidthSource.next(w);
  }
  setStrokeColor(hex: string) {
    this.strokeColorSource.next(hex);
  }
  setFillColor(hex: string) {
    this.fillColorSource.next(hex);
  }
}
