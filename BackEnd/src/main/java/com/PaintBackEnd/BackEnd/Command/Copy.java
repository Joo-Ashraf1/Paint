package com.PaintBackEnd.BackEnd.Command;

import com.PaintBackEnd.BackEnd.Shapes.Shape;

public class Copy extends Command {
    private Shape shape;
    
    public Copy(Shape shape){
        this.shape = (Shape) shape.clone();
    }

    @Override
    public void execute() {
        memory.addShape(this.shape);
    }

    @Override
    public void undo() {
        memory.deleteShape(this.shape);
    }
    
}
