import { Component, signal, ViewChild } from '@angular/core'
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
export class App {
  public title = signal("Paint")
}
