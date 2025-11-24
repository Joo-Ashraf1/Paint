import { Component, OnChanges, signal, SimpleChanges, ViewChild } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Toolbar } from './toolbar/toolbar'
import { Menu } from './menu/menu'
import { Canvas } from './canvas/canvas'
import { ColorPanel } from './color-panel/color-panel'


@Component({
  selector: 'app-root',
  imports: [Toolbar, Menu, Canvas, ColorPanel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnChanges {
  public title = signal("Paint")
  appSelectedTool : string = 'select'

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`selectedTool changed to ${this.appSelectedTool} from App`)
    this.appSelectedTool = 'select'
  }
  
}
