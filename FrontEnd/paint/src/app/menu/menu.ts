import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShapeService } from '../services/shape';
import { ShapeConfig } from 'konva/lib/Shape';
import { DtoToShapeConfigPipe } from '../pipes/dto-to-shape-config-pipe';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  providers: [DtoToShapeConfigPipe]
})
export class Menu {

  constructor(
    private shapeServie: ShapeService,
    private dtoToShape: DtoToShapeConfigPipe
  ) {
  }

  @Output() appToolChange = new EventEmitter<string>()
  @Input("menuSelectedTool") selectedTool: string = 'select'

  @Input() menuShapeConfigs : ShapeConfig[] = []
  @Output() menuShapeConfigsChange = new EventEmitter<ShapeConfig[]>()

  flashRedo = false;
  flashUndo = false

  triggerFlash(btnName: string) {
    switch (btnName) {
      case "redo":
        this.flashRedo = false
        requestAnimationFrame(() => {
          this.flashRedo = true
        });

        break;
      case "undo":
        this.flashUndo = false
        requestAnimationFrame(() => {
          this.flashUndo = true
        });
        break;
    }
  }

  onFlashEnd() {
    this.flashRedo = false;
    this.flashUndo = false;
  }

  emitToParent(toolName: string) {
    this.selectedTool = toolName;
    this.appToolChange.emit(toolName)
    console.log(`Clicked ${toolName} from toolbar`)
  }

  isSelected(tool: string): boolean {
    return this.selectedTool === tool;
  }

  sendUndoRequest() {
    this.shapeServie.undo().subscribe({
      next: (shapes) => {
        console.log("Undo result:")
        console.log(shapes)
        this.menuShapeConfigs = []
        for (let shape of shapes) {
          this.menuShapeConfigs.push(this.dtoToShape.transform(shape))
        }
        this.menuShapeConfigsChange.emit(this.menuShapeConfigs)
      },
      error: (error) => {
        console.error('Error Undo:', error);
      }
    })
  }

  sendRedoRequest() {
    this.shapeServie.redo().subscribe({
      next: (shapes) => {
        console.log("Redo result:")
        console.log(shapes)
        this.menuShapeConfigs = []
        for (let shape of shapes) {
          this.menuShapeConfigs.push(this.dtoToShape.transform(shape))
        }
        this.menuShapeConfigsChange.emit(this.menuShapeConfigs)
      },
      error: (error) => {
        console.error('Error Redo:', error);
      }
    })
  }
}
