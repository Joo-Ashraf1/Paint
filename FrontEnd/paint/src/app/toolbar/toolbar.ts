import { Component, EventEmitter, Output } from '@angular/core';
import { ShapeSelect } from '../directives/shape-select';

@Component({
  selector: 'app-toolbar',
  imports: [ShapeSelect],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  @Output() appToolChange = new EventEmitter<string>()
  emitToParent(toolName : string) {
    this.appToolChange.emit(toolName)
    console.log(`Clicked ${toolName} from toolbar`)
  }
}
