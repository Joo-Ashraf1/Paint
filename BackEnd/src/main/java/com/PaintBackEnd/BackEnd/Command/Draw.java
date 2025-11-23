package com.PaintBackEnd.BackEnd.Command;

import com.PaintBackEnd.BackEnd.Shapes.Shape;

public class Draw extends Command {
    private Shape shape;

    public Draw(Shape shape) {
        this.shape = shape;
    }

    @Override
    public void execute() {
        memory.addShape(shape);
    }

    @Override
    public void undo() {
        memory.deleteShape(this.shape);
    }
}