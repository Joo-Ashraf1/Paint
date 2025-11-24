import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  @Output() appToolChange = new EventEmitter<string>()
  @Input("menuSelectedTool") selectedTool: string = 'select'

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
}
