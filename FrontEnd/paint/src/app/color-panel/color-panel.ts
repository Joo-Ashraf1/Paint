import {Component, Input, input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ColorToCanvas} from '../color-to-canvas';


@Component({
  selector: 'app-color-panel',
  imports: [
    FormsModule
  ],
  templateUrl: './color-panel.html',
  styleUrl: './color-panel.css',
})
export class ColorPanel {
   currentFillColor = "#ffffff";
   currentStrokeColor = "#000000";
   currentStrokeWidth = 3;
   currentMode:string="fill";
   maxStrokeWidth:number=50;
   minStrokeWidth:number=0;
   eraser:boolean=false;
   constructor(private service:ColorToCanvas) {}


   selectColor(color: string) {
     if(this.currentMode==='fill'){
       this.currentFillColor=color;
       this.service.setFillColor(color);
     }
     else {
       this.currentStrokeColor = color;
       this.service.setStrokeColor(color);
     }
   }
   isActive(color: string) :boolean {
    if(this.currentMode==='fill'){
      return (this.currentFillColor===color)
    }
    else{
      return (this.currentStrokeColor===color)
    }

   }
  onHexPick(event: any) {
    const hex = event.target.value;

    if (this.currentMode === 'fill') {
      this.currentFillColor = hex;
      this.service.setFillColor(hex);
    } else {
      this.currentStrokeColor = hex;
      this.service.setStrokeColor(hex);
    }
  }
  onHexText(event: any) {
    const hex = event.target.value;

    // Only update if hex is valid
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      if (this.currentMode === 'fill') {
        this.currentFillColor = hex;
        this.service.setFillColor(hex);
      } else {
        this.currentStrokeColor = hex;
        this.service.setStrokeColor(hex);
      }
    }
  }
  getCurrentColor() {
    if (this.currentMode === 'fill') {
      return this.currentFillColor;
    }
    return this.currentStrokeColor;
  }




  // use @Input or @Output with these variables and update them correspondigly to user selection
  ngOnInit() {

    this.service.setFillColor(this.currentFillColor);
    this.service.setStrokeColor(this.currentStrokeColor);
    this.service.setStrokeWidth(this.currentStrokeWidth);
    this.service.setEraser(this.eraser);
  }

  onStrokeWidthChange(event: any) {
    event.target.value = Number(event.target.value)
     if(Number(event.target.value)>this.maxStrokeWidth){
       event.target.value=this.maxStrokeWidth;
     }
     else if(Number(event.target.value)<this.minStrokeWidth){
       event.target.value=this.minStrokeWidth;
     }
     this.currentStrokeWidth=Number(event.target.value);
     this.service.setStrokeWidth(this.currentStrokeWidth);

  }
  selectEraser() {
     this.eraser=!this.eraser;
     this.service.setEraser(this.eraser);

  }
  checkEraser() {
     return this.eraser;
  }
}
