import { Component, ViewChild } from '@angular/core';
import type { StageConfig } from 'konva/lib/Stage'
import { Shape, ShapeConfig } from 'konva/lib/Shape'
import type { CircleConfig } from 'konva/lib/shapes/Circle'
import type { RectConfig } from 'konva/lib/shapes/Rect'
import type { LineConfig } from 'konva/lib/shapes/Line'
import type { EllipseConfig } from 'konva/lib/shapes/Ellipse'
import type { RegularPolygonConfig } from 'konva/lib/shapes/RegularPolygon'
import type { TextConfig } from 'konva/lib/shapes/Text'
import type { TransformerConfig } from 'konva/lib/shapes/Transformer'
import Konva from 'konva'

import {
  CoreShapeComponent,
  StageComponent,
} from 'ng2-konva'

@Component({
  selector: 'app-canvas',
  imports: [StageComponent, CoreShapeComponent],
  templateUrl: './canvas.html',
  styleUrl: './canvas.css',
})
export class Canvas {
  @ViewChild('transformer') transformer!: any
  @ViewChild('rectRef') rectRef!: any
  @ViewChild('circleRef') circleRef!: any
  @ViewChild('ellipseRef') ellipseRef! : any
  @ViewChild('regularPolygonRef') regularPolygonRef! : any
  @ViewChild('selectionButtons') selectionButtons! : any
  @ViewChild("canvas_wrap_ref") canvas_wrap_element! : any
  currentTool = 'select'
  currentFillColor = "white"
  currentStrokeColor = "black"
  currentStrokeWidth = 3

  isDrawing : boolean = false
  x_start : number = 0
  y_start : number = 0
  x_end : number = 0
  y_end : number = 0

  

  public configStage: StageConfig = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  public rect1 : RectConfig = {
    x : 100,
    y : 100,
    fill : "red",
    stroke : "black",
    type : "rectangle",
    strokeWidth : 4,
    height : 100,
    width : 200,
    draggable : true,
    visible : true
  }

  shapeConfigs : ShapeConfig[] = [this.rect1]

  public rubber_band : RectConfig = {
    x : this.x_start,
    y : this.y_start,
    width : 0,
    height : 0,
    opacity : 0.25,
    fill : "#03dffc",
    stroke: "#27517a",
    strokeWidth : 2,
    visible : false
  }

  public trans1: TransformerConfig = {
    rotateEnabled: true,
    enabledAnchors: [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right'
    ]
  }

  handleStageMouseDown(event : any) {
    if (this.currentTool === "select")
      return;

    this.isDrawing = true

    const stage = event.target.getStage()
    const position = stage.getPointerPosition()

    this.x_start = position.x
    this.y_start = position.y

    this.rubber_band = {...this.rubber_band, x : this.x_start, y : this.y_start, visible : true}
  }

  handleStageMouseMove(event : any) {
    if (!this.isDrawing)
      return

    const stage = event.target.getStage()
    const position = stage.getPointerPosition()

    this.x_end = position.x
    this.y_end = position.y

    this.rubber_band = {
      ...this.rubber_band,
      width : Math.abs(this.x_end - this.x_start),
      height : Math.abs(this.y_end - this.y_start)
    }
  }

  handleStageMouseUp(event : any) {
    this.isDrawing = false

    this.rubber_band = {...this.rubber_band, visible : false}

    if (this.currentTool === "rectangle") {
      const rectangle : RectConfig = {
        x : this.x_start,
        y : this.y_start,
        height : this.rubber_band.height,
        width : this.rubber_band.width,
        fill : this.currentFillColor,
        stroke : this.currentStrokeColor,
        strokeWidth : this.currentStrokeWidth,
        draggable : true,
        type : "rectangle"
      }
      this.shapeConfigs.push(rectangle);
    }
    else if (this.currentTool === "ellipse") {
      const ellipse : EllipseConfig = {
        x : Math.abs(this.x_end + this.x_start) / 2,
        y : Math.abs(this.y_end + this.y_start) / 2,
        radiusY : (this.rubber_band.height) ?  this.rubber_band.height/ 2: 0,
        radiusX : (this.rubber_band.width) ?  this.rubber_band.width/ 2: 0,
        fill : this.currentFillColor,
        stroke : this.currentStrokeColor,
        strokeWidth : this.currentStrokeWidth,
        draggable : true,
        type : "ellipse"
      }
      this.shapeConfigs.push(ellipse);
    }

    this.currentTool = 'select'
  }

  public select(ref: any) {
    const node = ref.getNode()
    const tr = this.transformer.getNode()

    tr.nodes([node])
    tr.getLayer().batchDraw()
  }

  handleTransformEnd(event : any, index : number) {
    const node = event.target
    this.shapeConfigs[index] = {
      ...this.shapeConfigs[index],
      x: node.x(),
      y: node.y(),
      width: node.width() * node.scaleX(),
      height: node.height() * node.scaleY(),
      scaleX: 1,
      scaleY: 1,
      rotation : node.rotation()
    }
    node.scaleX(1)
    node.scaleY(1)
  }

  handleDragEnd(event : any, index : number) {
     const node = event.target
    this.shapeConfigs[index] = {
      ...this.shapeConfigs[index],
      x: node.x(),
      y: node.y()
    }
  }

  public checkDeselect(event: any) {
    // If we clicked on the stage (empty area), deselect
    const clickedOnEmpty = event.target === event.target.getStage()
    if (clickedOnEmpty) {
      const tr = this.transformer.getStage() as Konva.Transformer
      tr.nodes([]) // Clear selection
      tr.getLayer()?.batchDraw()
    }
  }

  public getRadius(sideLength : number, sides_number : number) : number {
    const radius = sideLength / (2 * Math.sin(Math.PI / sides_number))
    return radius
  }

  public handleMouseMove(event: any, object : any): void {
    // const mousePos = event.target.getStage().getPointerPosition()
    // const x = mousePos.x - object['x']
    // const y = mousePos.y - object['y']
    // this.mousePosText = { ...this.mousePosText, text: 'mouse position: x = ' + x + ', y = ' + y }
  }

  public handleMouseOut(): void {
    // this.mousePosText = { ...this.mousePosText, text: 'Mouse out of ellipse' }
  }

  public handleMouseOver(event : any) {
    event.target.getStage().container().style.cursor = 'pointer'
  }

  public handeMouseUp(event : any) {
    event.target.getStage().container().style.cursor = 'pointer'
  }

  public handleMouseLeave(event : any) {
    event.target.getStage().container().style.cursor = 'default'
  }

  public handleDragMove(event : any, shapeIndex : number) {
    event.target.getStage().container().style.cursor = 'move'
    const mousePos = event.target.getStage().getPointerPosition()
    // this.shapeConfigs[shapeIndex] = {...this.shapeConfigs[shapeIndex], x : mousePos.x, y : mousePos.y}
    // this.ShapePosText = { ...this.ShapePosText, text: 'shape position: x = ' + mousePos.x + ', y = ' + mousePos.y }
  }
}
