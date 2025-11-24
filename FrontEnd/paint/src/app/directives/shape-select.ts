import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appShapeSelect]'
})
export class ShapeSelect {

  @Output() toolselect = new EventEmitter<string>()
  constructor(private ele : ElementRef) { }

  @HostListener('click') toolClicked() {
    this.toolselect.emit(this.ele.nativeElement.title)
    console.log(`Clicked ${this.ele.nativeElement.title} from shapeselect directive`)
  }

}
