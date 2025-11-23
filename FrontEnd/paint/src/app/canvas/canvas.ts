import { Component, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core'
import { limitToStage } from './canvas.utils';
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
import { KonvaEventObject } from 'konva/lib/Node'

import {
  CoreShapeComponent,
  KonvaComponent,
  NgKonvaEventObject,
  StageComponent,
} from 'ng2-konva'
import { SideToRadiusPipe } from '../pipes/side-to-radius-pipe'
import { NodeConfig } from 'konva/lib/Node'

@Component({
  selector: 'app-canvas',
  imports: [StageComponent, CoreShapeComponent],
  templateUrl: './canvas.html',
  styleUrl: './canvas.css',
  providers: [SideToRadiusPipe]
})
export class Canvas {
  constructor(private sidetoradiuspipe : SideToRadiusPipe) {}
  @ViewChild('transformer') transformer!: KonvaComponent
  @ViewChild('transReg') transReg! : KonvaComponent
  @ViewChild('rectRef') rectRef!: KonvaComponent
  @ViewChild('circleRef') circleRef!: KonvaComponent
  @ViewChild('ellipseRef') ellipseRef! : KonvaComponent
  @ViewChild('regularPolygonRef') regularPolygonRef! : KonvaComponent
  @ViewChild('selectionButtons') selectionButtons! : KonvaComponent
  @ViewChild("canvas_wrap_ref") canvas_wrap_element : any
  @ViewChild('stageRef') stageRef! : KonvaComponent;
  @Input("currentTool") currentTool = 'select'
  @Output("currentToolChange") currentToolChange = new EventEmitter<string>()
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
    height: window.innerHeight
  }

  ngAfterViewInit() {
    const rect = this.canvas_wrap_element.nativeElement.getBoundingClientRect()

    this.configStage = {
      width : rect.width,
      height : rect.height
    }
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
    dragBoundFunc : limitToStage,
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

  public line_rubber_band : LineConfig = {
    points : [this.x_start, this.y_start],
    opacity : 0.25,
    stroke : "#27517a",
    strokeWidth : 1,
    visible : false
  }

  public trans_all: TransformerConfig = {
    rotateEnabled: false,
    enabledAnchors: [
      'top-left', 'top-right', 'top-center',
      'bottom-left', 'bottom-right', 'bottom-center',
      'middle-left', 'middle-right'
    ]
  }

  public trans_regular: TransformerConfig = {
    rotateEnabled: false,
    enabledAnchors: [
      'top-left', 'top-right',
      'bottom-left', 'bottom-right',
    ]
  }

  handleStageMouseDown() {
    if (this.currentTool === "select")
      return;

    this.isDrawing = true

    // const stage = event.event.target.getStage()
    const stage = this.stageRef.getStage() as Konva.Stage
    const position = stage?.getPointerPosition()
    this.x_start = position?.x ?? 0
    this.y_start = position?.y ?? 0
    

    if (this.currentTool !== "line")
      this.rubber_band = {
        ...this.rubber_band,
        x : this.x_start,
        y : this.y_start,
        visible : true
      }
    else if (this.currentTool === "line")
      this.line_rubber_band = {
        ...this.line_rubber_band,
        points : [this.x_start, this.y_start],
        visible : true
      }
  }

  handleStageMouseMove() {
    if (!this.isDrawing)
      return

    const stage = this.stageRef.getStage() as Konva.Stage | undefined
    const position = stage?.getPointerPosition()

    this.x_end = position?.x ?? 0
    this.y_end = position?.y ?? 0

    if (this.currentTool !== "line")
      this.rubber_band = {
        ...this.rubber_band,
        x : Math.min(this.x_start, this.x_end),
        y : Math.min(this.y_start, this.y_end),
        width : Math.abs(this.x_end - this.x_start),
        height : Math.abs(this.y_end - this.y_start)
      }
    else if (this.currentTool === "line")
      this.line_rubber_band = {
        ...this.line_rubber_band,
        points : [
          this.x_start, this.y_start,
          this.x_end, this.y_end
        ]
      }
  }

  handleStageMouseUp() {
    this.isDrawing = false

    const height = (this.rubber_band.height) ? this.rubber_band.height : 0
    const width = (this.rubber_band.width) ? this.rubber_band.width : 0

    this.rubber_band = {
      ...this.rubber_band, 
      height : 0,
      width : 0,
      visible : false
    }

    this.line_rubber_band = {
      ...this.line_rubber_band,
      points : [],
      visible : false
    }

    if (this.currentTool === "line") {
      const line : LineConfig = {
        points : [
          this.x_start, this.y_start,
          this.x_end, this.y_end
        ],
        stroke : this.currentStrokeColor,
        strokeWidth : this.currentStrokeWidth,
        draggable : true,
        dragBoundFunc : limitToStage,
        type : "line"
      }
      this.shapeConfigs.push(line);
    }
    else if (this.currentTool === "square") {
      const side = Math.min(height, width)
      const square : RectConfig = {
        x : Math.min(this.x_start, this.x_end),
        y : Math.min(this.y_start, this.y_end),
        height : side,
        width : side,
        fill : this.currentFillColor,
        stroke : this.currentStrokeColor,
        strokeWidth : this.currentStrokeWidth,
        draggable : true,
        dragBoundFunc : limitToStage,
        type : "square"
      }
      this.shapeConfigs.push(square);
    }
    else if (this.currentTool === "rectangle") {
      
      const rectangle : RectConfig = {
        x : Math.min(this.x_start, this.x_end),
        y : Math.min(this.y_start, this.y_end),
        height : height,
        width : width,
        fill : this.currentFillColor,
        stroke : this.currentStrokeColor,
        strokeWidth : this.currentStrokeWidth,
        draggable : true,
        dragBoundFunc : limitToStage,
        type : "rectangle"
      }
      this.shapeConfigs.push(rectangle);
    }
    else if (this.currentTool === "circle") {
      const radius = Math.min(height, width) / 2
      const circle : CircleConfig = {
        x : Math.abs(this.x_end + this.x_start) / 2,
        y : Math.abs(this.y_end + this.y_start) / 2,
        radius : radius,
        fill : this.currentFillColor,
        stroke : this.currentStrokeColor,
        strokeWidth : this.currentStrokeWidth,
        draggable : true,
        dragBoundFunc : limitToStage,
        type : "circle"
      }
      this.shapeConfigs.push(circle);
    }
    else if (this.currentTool === "ellipse") {
      const ellipse : EllipseConfig = {
        x : Math.abs(this.x_end + this.x_start) / 2,
        y : Math.abs(this.y_end + this.y_start) / 2,
        radiusY : height / 2,
        radiusX : width / 2,
        fill : this.currentFillColor,
        stroke : this.currentStrokeColor,
        strokeWidth : this.currentStrokeWidth,
        draggable : true,
        dragBoundFunc : limitToStage,
        type : "ellipse"
      }
      this.shapeConfigs.push(ellipse);
    }
    else if (this.currentTool === "triangle") {
      const side = Math.min(height, width)
      const triangle : RegularPolygonConfig = {
        x : Math.abs(this.x_end + this.x_start) / 2,
        y : Math.abs(this.y_end + this.y_start) / 2,
        sides : 3,
        radius : this.sidetoradiuspipe.transform(side, 3),
        fill : this.currentFillColor,
        stroke : this.currentStrokeColor,
        strokeWidth : this.currentStrokeWidth,
        draggable : true,
        dragBoundFunc : limitToStage,
        type : "triangle"
      }
      this.shapeConfigs.push(triangle)
    }

    this.currentTool = 'select'
    this.currentToolChange.emit(this.currentTool)
  }

  public select(event : NgKonvaEventObject<MouseEvent>) {
    const shapeNode = event.event.target as Konva.Node
    console.log(shapeNode)
    // const node = ref.getNode()
    let tr : Konva.Transformer
    if (shapeNode.attrs['type'] === 'square' || shapeNode.attrs['type'] === 'circle') {
      tr = this.transReg.getStage() as Konva.Transformer
    }
    else {
      tr = this.transformer.getStage() as Konva.Transformer
    }

    tr.nodes([shapeNode])
    // tr.getLayer()?.batchDraw()
  }

  public checkDeselect(event : NgKonvaEventObject<MouseEvent>) {
    // If we clicked on the stage (empty area), deselect
    const clickedNode = event.event.target
    const stage = this.stageRef.getStage()
    // const clickedOnEmpty = event.event.target === stage
    if (stage && clickedNode === stage) {
      let tr = this.transformer.getStage() as Konva.Transformer
      tr.nodes([]) // Clear selection
      tr.getLayer()?.batchDraw()

      tr = this.transReg.getStage() as Konva.Transformer
      tr.nodes([]) // Clear selection
      tr.getLayer()?.batchDraw()
    }
  }

  handleTransformEnd(event : NgKonvaEventObject<MouseEvent>, index : number) {
    const node = event.event.target
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

  handleDragEnd(event : NgKonvaEventObject<MouseEvent>, index : number) {
     const node = event.event.target
    this.shapeConfigs[index] = {
      ...this.shapeConfigs[index],
      x: node.x(),
      y: node.y()
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

  public handleMouseOver(event : NgKonvaEventObject<MouseEvent>) {
    const stage = event.event.target.getStage()
    if (stage)
      stage.container().style.cursor = 'pointer'
  }

  public handeMouseUp(event : NgKonvaEventObject<MouseEvent>) {
    const stage = event.event.target.getStage()
    if (stage)
    stage.container().style.cursor = 'pointer'
  }

  public handleMouseLeave(event : NgKonvaEventObject<MouseEvent>) {
    const stage = event.event.target.getStage()
    if (stage)
      stage.container().style.cursor = 'default'
  }

  public handleDragMove(event : NgKonvaEventObject<MouseEvent>, shapeIndex : number) {
    const stage = event.event.target.getStage()
    if (stage)
      stage.container().style.cursor = 'move'

    const mousePos = stage?.getPointerPosition()
    // this.shapeConfigs[shapeIndex] = {...this.shapeConfigs[shapeIndex], x : mousePos.x, y : mousePos.y}
    // this.ShapePosText = { ...this.ShapePosText, text: 'shape position: x = ' + mousePos.x + ', y = ' + mousePos.y }
  }
}
