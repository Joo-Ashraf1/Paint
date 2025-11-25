import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { ShapeService } from '../services/shape';
import { ShapeConfig } from 'konva/lib/Shape';
import { DtoToShapeConfigPipe } from '../pipes/dto-to-shape-config-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  providers: [DtoToShapeConfigPipe]
})
export class Menu {

  constructor(
    private shapeServie: ShapeService,
    private dtoToShape: DtoToShapeConfigPipe
  ) {}

  // Menu State
  isLoadMenuOpen = false;
  isSaveMenuOpen = false;

  // Modal States
  isSaveModalOpen = false;
  isLoadModalOpen = false;

  filename = signal('my-drawing'); // Default filename
  selectedFormat = 'json';
  mockDirectory = 'D:/Engineering'; 
  
  // Temporary input for the Load Modal
  fileToLoadInput = '';

  // Variables to store results
  finalSavedPath: string | null = null;
  loadedFilePath: string | null = null;

  // This variable stores the FileSystemFileHandle after the user saves
  savedFileHandle: any = null;

  @Output() appToolChange = new EventEmitter<string>()
  @Input("menuSelectedTool") selectedTool: string = 'select'

  @Input() menuShapeConfigs : ShapeConfig[] = []
  @Output() menuShapeConfigsChange = new EventEmitter<ShapeConfig[]>()

  flashRedo = false;
  flashUndo = false

  toggleLoadMenu() {
    this.isLoadMenuOpen = !this.isLoadMenuOpen;
    this.isSaveMenuOpen = false; // Close other menu
  }

  toggleSaveMenu() {
    this.isSaveMenuOpen = !this.isSaveMenuOpen;
    this.isLoadMenuOpen = false; // Close other menu
  }

  // TRACKING METHODS
  
  onLoadOption(format: string) {
    console.log(`[TRACKING] User clicked LOAD for format: ${format}`);
    this.selectedFormat = format;
    this.isLoadMenuOpen = false;
    this.fileToLoadInput = ''; // Reset input
    this.isLoadModalOpen = true; // Open Custom Modal
  }

  cancelLoad() {
    this.isLoadModalOpen = false;
  }

  confirmLoad() {
    if (!this.fileToLoadInput) return;
    
    // Construct full path based on what user typed
    if (this.fileToLoadInput.includes("." + this.selectedFormat)) {
      const lastIndex = this.fileToLoadInput.lastIndexOf(".")
      this.fileToLoadInput = this.fileToLoadInput.slice(0, lastIndex)
    }
    const fullPath = `${this.mockDirectory}\\${this.fileToLoadInput}.${this.selectedFormat}`;
    this.loadedFilePath = fullPath;
    
    // Update the main filename variable
    this.filename.set(this.fileToLoadInput);

    console.log('[TRACKING] User clicked OPEN in custom load window.');
    console.log('[VARIABLE STORED] Loaded File Path:', this.loadedFilePath);

    this.shapeServie.load(fullPath).subscribe({
      next: (shapes) => {
        console.log("Load result:")
        console.log(shapes)
        this.menuShapeConfigs = []
        for (let shape of shapes) {
          this.menuShapeConfigs.push(this.dtoToShape.transform(shape))
        }
        this.menuShapeConfigsChange.emit(this.menuShapeConfigs)
      },
      error: (error) => {
        console.error('Error Loading:', error);
      }
    })
    
    this.isLoadModalOpen = false;
    alert(`Simulated Load Successful!\nPath: ${this.loadedFilePath}\nFilename updated.`);
  }

  onSaveOption(format: string) {
    this.selectedFormat = format;
    this.isSaveMenuOpen = false;
    this.isSaveModalOpen = true; 
  }

  cancelSave() {
    this.isSaveModalOpen = false;
  }

  confirmSave() {
    const fullPath = `${this.mockDirectory}/${this.filename()}.${this.selectedFormat}`;
    this.finalSavedPath = fullPath;
    
    console.log('[TRACKING] User clicked SAVE in custom save window.');
    console.log('[VARIABLE STORED] Final Save Path:', this.finalSavedPath);

    let saveMessage : string = ""
    this.shapeServie.save(fullPath).subscribe({
      next: (message) => {
        console.log("Save result:")
        console.log(message)
        saveMessage = message
      },
      error: (error) => {
        console.error('Error Loading:', error);
      }
    })
    
    this.isSaveModalOpen = false;
    alert(`File path stored in variable:\n${this.finalSavedPath}`);
  }

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
