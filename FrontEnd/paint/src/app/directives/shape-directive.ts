import { Directive, ElementRef, HostListener } from '@angular/core';
import { KonvaComponent } from 'ng2-konva';

@Directive({
  selector: '[appShapeDirective]'
})
export class ShapeDirective {

  constructor(private ele : KonvaComponent) { 
    console.log(this.ele)
  }

  @HostListener('mouseover') over() {
    const node = this.ele.getStage()
    const stage = node.getStage()
    if (stage)
      stage.container().style.cursor = 'pointer'
  }

}
