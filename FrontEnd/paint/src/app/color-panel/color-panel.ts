import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-color-panel',
  imports: [
    FormsModule
  ],
  templateUrl: './color-panel.html',
  styleUrl: './color-panel.css',
})
export class ColorPanel {
   currentFillColor = "white";
   currentStrokeColor = "black";
   currentStrokeWidth = 3;
   currentMode:string="fill";


   selectColor(color: string) {
     if(this.currentMode==='fill'){
       this.currentFillColor=color;
     }
     else {
       this.currentStrokeColor = color;
     }
   }
   isActive(color: string) :boolean {
    if(this.currentMode==='fill'){
      if(this.currentFillColor===color){
        return true;
      }
      else {
        return false;
      }
    }
    else{
      if(this.currentStrokeColor==color){
        return true;
      }
      else{
        return false;
      }
    }

   }


  // use @Input or @Output with these variables and update them correspondigly to user selection
}
