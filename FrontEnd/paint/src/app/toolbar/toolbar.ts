import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ShapeSelect } from '../directives/shape-select';

@Component({
  selector: 'app-toolbar',
  imports: [ShapeSelect],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  @Output() appToolChange = new EventEmitter<string>()
  @Input('toolbarSelectedTool') selectedTool: string = 'select';

  emitToParent(toolName : string) {
    this.selectedTool = toolName;
    this.appToolChange.emit(toolName)
    console.log(`Clicked ${toolName} from toolbar`)
  }

  isSelected(tool: string): boolean {
    return this.selectedTool === tool;
  }
}
