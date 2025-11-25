import { Component, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core'
import type { StageConfig } from 'konva/lib/Stage'
import { ShapeConfig } from 'konva/lib/Shape'
import type { CircleConfig } from 'konva/lib/shapes/Circle'
import type { RectConfig } from 'konva/lib/shapes/Rect'
import type { LineConfig } from 'konva/lib/shapes/Line'
import type { EllipseConfig } from 'konva/lib/shapes/Ellipse'
import type { RegularPolygonConfig } from 'konva/lib/shapes/RegularPolygon'
import type { TransformerConfig } from 'konva/lib/shapes/Transformer'
import Konva from 'konva'
import { ShapeService } from '../services/shape';
import { ShapeDTO } from '../models/shapedto';
import { ShapeDtoPipe } from '../pipes/shape-dto-pipe';

import {
  CoreShapeComponent,
  KonvaComponent,
  NgKonvaEventObject,
  StageComponent,
} from 'ng2-konva'
import { SideToRadiusPipe } from '../pipes/side-to-radius-pipe'
import { ColorToCanvas } from '../color-to-canvas';
import { Subscription } from 'rxjs';
import { DtoToShapeConfigPipe } from '../pipes/dto-to-shape-config-pipe';


@Component({
  selector: 'app-canvas',
  imports: [StageComponent, CoreShapeComponent],
  templateUrl: './canvas.html',
  styleUrl: './canvas.css',
  providers: [SideToRadiusPipe, ShapeDtoPipe, DtoToShapeConfigPipe]
})
export class Canvas {
  constructor(
    private sidetoradiuspipe: SideToRadiusPipe,
    private shapeServie: ShapeService,
    private shapedto: ShapeDtoPipe,
    private service: ColorToCanvas,
    private dtoToShape: DtoToShapeConfigPipe
  ) { }

  @ViewChild('transformer') transformer!: KonvaComponent
  @ViewChild('transReg') transReg!: KonvaComponent
  @ViewChild('rectRef') rectRef!: KonvaComponent
  @ViewChild('circleRef') circleRef!: KonvaComponent
  @ViewChild('ellipseRef') ellipseRef!: KonvaComponent
  @ViewChild('regularPolygonRef') regularPolygonRef!: KonvaComponent
  @ViewChild('selectionButtons') selectionButtons!: KonvaComponent
  @ViewChild("canvas_wrap_ref") canvas_wrap_element: any
  @ViewChild('stageRef') stageRef!: KonvaComponent;

  @Input() currentTool = 'select'
  @Output() currentToolChange = new EventEmitter<string>()

  currentFillColor = "white"
  currentStrokeColor = "black"
  currentStrokeWidth = 3
  eraser: boolean = false;

  public configStage: StageConfig = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  lineShape: LineConfig = {
    points: [],
    visible: false,
    stroke: this.currentStrokeColor,
    strokeWidth: this.currentStrokeWidth,
    draggable: true,
    type: "line"
  }
  squareShape: RectConfig = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
    fill: this.currentFillColor,
    stroke: this.currentStrokeColor,
    strokeWidth: this.currentStrokeWidth,
    draggable: true,
    type: "square"

  };
  rectangleShape: RectConfig = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
    fill: this.currentFillColor,
    stroke: this.currentStrokeColor,
    strokeWidth: this.currentStrokeWidth,
    draggable: true,
    type: "rectangle"

  };
  circleShape: CircleConfig = {
    x: 0,
    y: 0,
    radius: 0,
    visible: false,
    fill: this.currentFillColor,
    stroke: this.currentStrokeColor,
    strokeWidth: this.currentStrokeWidth,
    draggable: true,
    type: "circle"
  };
  ellipseShape: EllipseConfig = {
    x: 0,
    y: 0,
    radiusX: 0,
    radiusY: 0,
    visible: false,
    fill: this.currentFillColor,
    stroke: this.currentStrokeColor,
    strokeWidth: this.currentStrokeWidth,
    draggable: true,
    type: "ellipse"
  };
  triangleShape: RegularPolygonConfig = {
    x: 0,
    y: 0,
    sides: 3,
    radius: 0,
    visible: false,
    fill: this.currentFillColor,
    stroke: this.currentStrokeColor,
    strokeWidth: this.currentStrokeWidth,
    draggable: true,
    type: "triangle"
  };



  isDrawing: boolean = false
  x_start: number = 0
  y_start: number = 0
  x_end: number = 0
  y_end: number = 0

  shapeConfigs: ShapeConfig[] = []

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

  //here 3mk youssef handles inputs from color panel

  private subs = new Subscription();
  ngOnInit() {
    this.subs.add(this.service.strokeColor$.subscribe(c => {
      this.currentStrokeColor = c;
    }));
    this.subs.add(this.service.fillColor$.subscribe(c => {
      this.currentFillColor = c;
    }));
    this.subs.add(this.service.strokeWidth$.subscribe(c => {
      this.currentStrokeWidth = c;
    }));
    // this.subs.add(this.service.eraser$.subscribe(c => {
    //   this.eraser = c;
    // }))
  }

  ngAfterViewInit() {
    const rect = this.canvas_wrap_element.nativeElement.getBoundingClientRect()

    this.configStage = {
      width: rect.width,
      height: rect.height
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
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

    switch (this.currentTool) {
      case "line":
        this.lineShape = {
          ...this.lineShape,
          points: [this.x_start, this.y_start],
          stroke: this.currentStrokeColor,
          strokeWidth: this.currentStrokeWidth,
          visible: true
        }
        break;
      case "square":
        this.squareShape = {
          ...this.squareShape,
          x: this.x_start,
          y: this.y_start,
          fill: this.currentFillColor,
          stroke: this.currentStrokeColor,
          strokeWidth: this.currentStrokeWidth,
          visible: true
        }
        break;
      case "rectangle":
        this.rectangleShape = {
          ...this.rectangleShape,
          x: this.x_start,
          y: this.y_start,
          fill: this.currentFillColor,
          stroke: this.currentStrokeColor,
          strokeWidth: this.currentStrokeWidth,
          visible: true
        }
        break;
      case "circle":
        this.circleShape = {
          ...this.circleShape,
          x: this.x_start,
          y: this.y_start,
          fill: this.currentFillColor,
          stroke: this.currentStrokeColor,
          strokeWidth: this.currentStrokeWidth,
          visible: true
        }
        break;
      case "ellipse":
        this.ellipseShape = {
          ...this.ellipseShape,
          x: this.x_start,
          y: this.y_start,
          fill: this.currentFillColor,
          stroke: this.currentStrokeColor,
          strokeWidth: this.currentStrokeWidth,
          visible: true
        }
        break;
      case "triangle":
        this.triangleShape = {
          ...this.triangleShape,
          x: this.x_start,
          y: this.y_start,
          fill: this.currentFillColor,
          stroke: this.currentStrokeColor,
          strokeWidth: this.currentStrokeWidth,
          visible: true
        }
        break;
    }
  }

  handleStageMouseMove() {
    if (!this.isDrawing)
      return

    const stage = this.stageRef.getStage() as Konva.Stage | undefined
    const position = stage?.getPointerPosition()

    this.x_end = position?.x ?? 0
    this.y_end = position?.y ?? 0

    const width = Math.abs(this.x_end - this.x_start)
    const height = Math.abs(this.y_end - this.y_start)
    const x_center = (this.x_start + this.x_end) / 2
    const y_center = (this.y_start + this.y_end) / 2
    switch (this.currentTool) {
      case "line":
        this.lineShape = {
          ...this.lineShape,
          points: [
            this.x_start, this.y_start,
            this.x_end, this.y_end
          ]
        }
        break;
      case "square":
        this.squareShape = {
          ...this.squareShape,
          x: Math.min(this.x_start, this.x_end),
          y: Math.min(this.y_start, this.y_end),
          width: Math.min(width, height),
          height: Math.min(width, height)
        }
        break;
      case "rectangle":
        this.rectangleShape = {
          ...this.rectangleShape,
          x: Math.min(this.x_start, this.x_end),
          y: Math.min(this.y_start, this.y_end),
          width: width,
          height: height
        }
        break;
      case "circle":
        this.circleShape = {
          ...this.circleShape,
          x: x_center,
          y: y_center,
          radius: Math.min(width, height) / 2
        }
        break;
      case "ellipse":
        this.ellipseShape = {
          ...this.ellipseShape,
          x: x_center,
          y: y_center,
          radiusX: width / 2,
          radiusY: height / 2
        }
        break;
      case "triangle":
        const side = Math.min(width, height)
        this.triangleShape = {
          ...this.triangleShape,
          x: x_center,
          y: y_center,
          radius: this.sidetoradiuspipe.transform(side, 3)
        }
        break;
    }
  }

  handleStageMouseUp() {
    if (!this.isDrawing || this.currentTool === 'copy' || this.currentTool === 'select' || this.currentTool === 'eraser') {
      return;
    }
    this.isDrawing = false
    //const newId = Date.now().toString();

    switch (this.currentTool) {

      case "line":

        this.shapeConfigs.push({ ...this.lineShape })
        this.lineShape = { ...this.lineShape, visible: false }
        break;
      case "square":

        this.shapeConfigs.push({ ...this.squareShape })
        this.squareShape = { ...this.squareShape, visible: false }
        break;
      case "rectangle":
        this.shapeConfigs.push({ ...this.rectangleShape })
        this.rectangleShape = { ...this.rectangleShape, visible: false }
        break;
      case "circle":
        this.shapeConfigs.push({ ...this.circleShape })
        this.circleShape = { ...this.circleShape, visible: false }
        break;
      case "ellipse":
        this.shapeConfigs.push({ ...this.ellipseShape })
        this.ellipseShape = { ...this.ellipseShape, visible: false }
        break;
      case "triangle":
        this.shapeConfigs.push({ ...this.triangleShape })
        this.triangleShape = { ...this.triangleShape, visible: false }
        break;
    }

    this.currentTool = 'select'
    this.currentToolChange.emit(this.currentTool)

    const lastIndex: number = this.shapeConfigs.length - 1;
    this.shapeServie.draw(this.shapedto.transform(this.shapeConfigs[lastIndex])).subscribe({
      next: (shape) => {
        this.shapeConfigs[lastIndex] = {...this.shapeConfigs[lastIndex], id : shape.id.toString()}
        console.log('User created:', shape);
      },
      error: (error) => {
        console.error('Error creating user:', error);
      }
    })
  }

  public select(event: NgKonvaEventObject<MouseEvent>, index: number) {
    const shapeNode = event.event.target as Konva.Node;
    if (!shapeNode) return;

    if (this.currentTool === 'eraser') {
      console.log("id of shape in array : " + this.shapeConfigs[index]['id'])
      this.shapeServie.delete(this.shapedto.transform(this.shapeConfigs[index])).subscribe({
        error: err => console.error("Copy error:", err)
      })
      this.shapeConfigs.splice(index, 1);
      //I used splice because it shifts the elements after deleted one index
      // this.shapeConfigs = [...this.shapeConfigs];

      try {
        const tr1 = this.transformer.getStage() as Konva.Transformer;
        const tr2 = this.transReg.getStage() as Konva.Transformer;
        if (tr1) { tr1.nodes([]); tr1.getLayer()?.batchDraw(); }
        if (tr2) { tr2.nodes([]); tr2.getLayer()?.batchDraw(); }
      } catch (err) {

      }
    }
    // -------------- COPY MODE --------------
    else if (this.currentTool === "copy") {

      const original = this.shapeConfigs[index];
      if (!original) return;

      this.shapeServie.copy(this.shapedto.transform(original)).subscribe({
        next: (copied: ShapeDTO) => {
          this.shapeConfigs.push(this.dtoToShape.transform(copied));

          // this.shapeConfigs = [...this.shapeConfigs];  //elstr dy elly hwa by7ot fel canvas
          console.log("Copied from backend:", copied);
        },
        error: err => console.error("Copy error:", err)
      });

    }
    else {
      let tr: Konva.Transformer;
      let other_tr: Konva.Transformer;
      if (shapeNode.attrs['type'] === 'square' || shapeNode.attrs['type'] === 'circle' || shapeNode.attrs['type'] === 'triangle') {
        tr = this.transReg.getStage() as Konva.Transformer;
        other_tr = this.transformer.getStage() as Konva.Transformer;
      } else {
        tr = this.transformer.getStage() as Konva.Transformer;
        other_tr = this.transReg.getStage() as Konva.Transformer;
      }

      tr.nodes([shapeNode]);
      other_tr.nodes([]);
    }

  }




  public Deselect(event: NgKonvaEventObject<MouseEvent>) {
    if (!event) return;
    const anyEvent = event as any;
    if (!anyEvent.target && anyEvent.event && anyEvent.event.target) {
      anyEvent.target = anyEvent.event.target;
    }
    if (!anyEvent.target) return;

    const clickedNode = anyEvent.target;
    const stage = this.stageRef.getStage();
    if (!stage) return;

    if (clickedNode === stage) {
      // clear transformers
      this.currentTool = 'select';
      this.currentToolChange.emit('select')
      let tr = this.transformer.getStage() as Konva.Transformer;
      tr.nodes([]);
      tr.getLayer()?.batchDraw();

      tr = this.transReg.getStage() as Konva.Transformer;
      tr.nodes([]);
      tr.getLayer()?.batchDraw();
    }
  }

  handleTransformEnd(event: NgKonvaEventObject<MouseEvent>, index: number) {
    const node = event.event.target
    if (this.shapeConfigs[index]['type'] === 'circle') {
      const r = (node.width() * node.scaleX()) / 2;
      this.shapeConfigs[index] = {
        ...this.shapeConfigs[index],
        radius: r,
        x: node.x(),
        y: node.y(),
        scaleX: 1,
        scaleY: 1,
        rotation: node.rotation()
      }
    }
    else if (this.shapeConfigs[index]['type'] === 'ellipse') {
      const rx = (node.width() * node.scaleX()) / 2;
      const ry = (node.height() * node.scaleY()) / 2;
      this.shapeConfigs[index] = {
        ...this.shapeConfigs[index],
        radiusX: rx,
        radiusY: ry,
        x: node.x(),
        y: node.y(),
        scaleX: 1,
        scaleY: 1,
        rotation: node.rotation()
      }
    }
    else if (this.shapeConfigs[index]['type'] == 'triangle') {
      const r = (node.width() * node.scaleX()) / 2;
      this.shapeConfigs[index] = {
        ...this.shapeConfigs[index],
        radius: r,
        x: node.x(),
        y: node.y(),
        scaleX: 1,
        scaleY: 1,
        rotation: node.rotation()
      }
    }
    else if (this.shapeConfigs[index]['type'] === 'line') {
      let linePoints: number[] = this.shapeConfigs[index]['points']
      for (let i = 0; i < linePoints.length; i += 2) {
        linePoints[i] = linePoints[i] * node.scaleX()
        linePoints[i + 1] = linePoints[i + 1] * node.scaleY()
      }
      this.shapeConfigs[index] = {
        ...this.shapeConfigs[index],
        points: linePoints,
        x: node.x(),
        y: node.y(),
        scaleX: 1,
        scaleY: 1,
        rotation: node.rotation()
      }
    }
    else {
      this.shapeConfigs[index] = {
        ...this.shapeConfigs[index],
        x: node.x(),
        y: node.y(),
        width: node.width() * node.scaleX(),
        height: node.height() * node.scaleY(),
        scaleX: 1,
        scaleY: 1,
        rotation: node.rotation()
      }
    }

    node.scaleX(1)
    node.scaleY(1)
  }

  handleDragEnd(event: NgKonvaEventObject<MouseEvent>, index: number) {
    const node = event.event.target
    this.shapeConfigs[index] = {
      ...this.shapeConfigs[index],
      x: node.x(),
      y: node.y()
    }
  }

  public getRadius(sideLength: number, sides_number: number): number {
    const radius = sideLength / (2 * Math.sin(Math.PI / sides_number))
    return radius
  }

  public handleMouseMove(event: any, object: any): void {
    // const mousePos = event.target.getStage().getPointerPosition()
    // const x = mousePos.x - object['x']
    // const y = mousePos.y - object['y']
    // this.mousePosText = { ...this.mousePosText, text: 'mouse position: x = ' + x + ', y = ' + y }
  }

  public handleMouseOut(): void {
    // this.mousePosText = { ...this.mousePosText, text: 'Mouse out of ellipse' }
  }

  public handleMouseOver(event: NgKonvaEventObject<MouseEvent>) {
    const stage = event.event.target.getStage()
    if (stage)
      stage.container().style.cursor = 'pointer'
  }

  public handeMouseUp(event: NgKonvaEventObject<MouseEvent>) {
    const stage = event.event.target.getStage()
    if (stage)
      stage.container().style.cursor = 'pointer'
  }

  public handleMouseLeave(event: NgKonvaEventObject<MouseEvent>) {
    const stage = event.event.target.getStage()
    if (stage)
      stage.container().style.cursor = 'default'
  }

  public handleDragMove(event: NgKonvaEventObject<MouseEvent>, shapeIndex: number) {
    const stage = event.event.target.getStage()
    if (stage)
      stage.container().style.cursor = 'move'

    // const mousePos = stage?.getPointerPosition()
    // this.shapeConfigs[shapeIndex] = {...this.shapeConfigs[shapeIndex], x : mousePos.x, y : mousePos.y}
    // this.ShapePosText = { ...this.ShapePosText, text: 'shape position: x = ' + mousePos.x + ', y = ' + mousePos.y }
  }

}
