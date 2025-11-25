import { Pipe, PipeTransform } from '@angular/core';
import { ShapeDTO } from '../models/shapedto';
import { ShapeConfig } from 'konva/lib/Shape';
import { LineConfig } from 'konva/lib/shapes/Line';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { CircleConfig } from 'konva/lib/shapes/Circle';
import { EllipseConfig } from 'konva/lib/shapes/Ellipse';
import { RegularPolygonConfig } from 'konva/lib/shapes/RegularPolygon';

@Pipe({
  name: 'dtoToShapeConfig'
})
export class DtoToShapeConfigPipe implements PipeTransform {

  transform(dto: ShapeDTO): LineConfig|RectConfig|CircleConfig|EllipseConfig|RegularPolygonConfig {

    let baseConfig: ShapeConfig = {
      id: dto.id.toString(),
      rotation: dto.rotation,
      fill: dto.fill,
      stroke: dto.stroke,
      strokeWidth: dto.strokeWidth,
    };

    switch (dto.shapeType) {

      case 'line':
        const line: LineConfig = {
          ...baseConfig,
          type: 'line',
          points: [dto.x_start, dto.y_start, dto.x_end, dto.y_end]
        };
        return line;

      case 'square':
        const squareSide = dto.side ?? 0;
        const square: RectConfig = {
          ...baseConfig,
          type: 'square',
          x: dto.x_start,
          y: dto.y_start,
          width: squareSide,
          height: squareSide
        };
        return square;

      case 'rectangle':
        const rectangle: RectConfig = {
          ...baseConfig,
          type: 'rectangle',
          x: dto.x_start,
          y: dto.y_start,
          width: dto.width ?? 0,
          height: dto.height ?? 0
        };
        return rectangle;

      case 'circle':
        const radius = dto.radius ?? 0;
        const circle: CircleConfig = {
          ...baseConfig,
          type: 'circle',
          x: dto.x_start + radius,
          y: dto.y_start + radius,
          radius: radius
        };
        return circle;

      case 'ellipse':
        const ellipse: EllipseConfig = {
          ...baseConfig,
          type: 'ellipse',
          x: dto.x_start + (dto.x_radius ?? 0),
          y: dto.y_start + (dto.y_radius ?? 0),
          radiusX: dto.x_radius ?? 0,
          radiusY: dto.y_radius ?? 0,
        };
        return ellipse;

      case 'triangle':
        const triangle: RegularPolygonConfig = {
          ...baseConfig,
          type: 'triangle',
          x: (dto.x_start + dto.x_end) / 2,
          y: (dto.y_start + dto.y_end) / 2,
          sides: 3,
          radius: (dto.side ?? 0) / (2 * Math.sin(Math.PI / 3)),
        };
        return triangle;

      default:
        return baseConfig;
    }
  }

}

