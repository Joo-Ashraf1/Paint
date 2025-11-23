package com.PaintBackEnd.BackEnd.Command;

import com.PaintBackEnd.BackEnd.Shapes.Shape;

public class Delete extends Command {
    private Shape shape;

    public Delete(Shape shape) {
        this.shape = shape;
    }

    @Override
    public void execute() {
        memory.deleteShape(this.shape);
    }

    @Override
    public void undo() {
        memory.addShape(shape);
    }
}