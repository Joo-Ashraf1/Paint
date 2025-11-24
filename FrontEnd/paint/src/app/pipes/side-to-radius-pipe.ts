import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sideToRadius'
})
export class SideToRadiusPipe implements PipeTransform {

  transform(sideLength : number, n : number): number {
    const radius = sideLength / (2 * Math.sin(Math.PI / n))
    return radius
  }

}
