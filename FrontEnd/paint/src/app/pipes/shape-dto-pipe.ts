import { Pipe, PipeTransform } from '@angular/core';
import { ShapeDTO } from '../models/shapedto';
import { ShapeConfig } from 'konva/lib/Shape';
import { LineConfig } from 'konva/lib/shapes/Line';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { Rect } from 'fabric';
import { CircleConfig } from 'konva/lib/shapes/Circle';
import { EllipseConfig } from 'konva/lib/shapes/Ellipse';
import { RegularPolygonConfig } from 'konva/lib/shapes/RegularPolygon';

@Pipe({
  name: 'shapeDto'
})
export class ShapeDtoPipe implements PipeTransform {

  transform(shape : ShapeConfig): ShapeDTO {
    let result : ShapeDTO = {
      shapeType  : shape['type'],
      id : 0,
      rotation : shape['rotation']?? 0,
      x_start : 0,
      y_start : 0,
      x_end : 0,
      y_end : 0,
      fill : (shape['fill'] as string)?? "white",
      stroke : (shape['stroke'] as string)?? 'black',
      strokeWidth : shape['strokeWidth']?? 1
    }
    switch (shape['type']) {
      case 'line':
        const line : LineConfig = shape as LineConfig
        result = {
          ...result,
          x_start : (line.points) ? line.points[0]?? 0 : 0,
          y_start : (line.points) ? line.points[1]?? 0 : 0,
          x_end : (line.points) ? line.points[2]?? 0 : 0,
          y_end : (line.points) ? line.points[3]?? 0 : 0
        }
        break;
      case 'square':
        const square : RectConfig = shape as RectConfig
        result = {
          ...result,
          x_start : square.x?? 0,
          y_start : square.y?? 0,
          x_end : (square.x?? 0) + (square.width?? 0),
          y_end : (square.y?? 0) + (square.height?? 0),
          side : square.width?? square.height?? 0
        }
        break;
      case 'rectangle':
        const rect : RectConfig = shape as RectConfig
        result = {
          ...result,
          x_start : rect.x?? 0,
          y_start : rect.y?? 0,
          x_end : (rect.x?? 0) + (rect.width?? 0),
          y_end : (rect.y?? 0) + (rect.height?? 0),
          width : rect.width?? 0,
          height : rect.height?? 0
        }
        break;
      case 'circle':
        const circle : CircleConfig = shape as CircleConfig
        result = {
          ...result,
          radius : circle.radius?? 0,
          x_start : (circle.x?? 0) - (circle.radius?? 0),
          y_start : (circle.y?? 0) - (circle.radius?? 0),
          x_end : (circle.x?? 0) + (circle.radius?? 0),
          y_end : (circle.y?? 0) + (circle.radius?? 0)
        }
        break;
      case 'ellipse':
        const ellipse : EllipseConfig = shape as EllipseConfig
        result = {
          ...result,
          x_radius : ellipse.radiusX,
          y_radius : ellipse.radiusY,
          x_start : (ellipse.x?? 0) - ellipse.radiusX,
          y_start : (ellipse.y?? 0) - ellipse.radiusY,
          x_end : (ellipse.x?? 0) + ellipse.radiusX,
          y_end : (ellipse.y?? 0) + ellipse.radiusY
        }
        break;
      case 'triangle':
        const triangle : RegularPolygonConfig = shape as RegularPolygonConfig
        result = {
          ...result,
          side : triangle.radius * (2 * Math.sin(Math.PI / 3)),
          x_start : (triangle.x?? 0) - triangle.radius,
          y_start : (triangle.y?? 0) - triangle.radius,
          x_end : (triangle.x?? 0) + triangle.radius,
          y_end : (triangle.y?? 0) + triangle.radius
        }
        break;
    }
    return result
  }

}
