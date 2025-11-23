package com.PaintBackEnd.BackEnd.Command;

import com.PaintBackEnd.BackEnd.Shapes.Shape;

public class Update extends Command { // Move , Recolor , Resize
    private Shape oldShape;
    private Shape newShape;

    public Update(Shape shape) {
        this.newShape = shape;
    }

    @Override
    public void execute() {
        oldShape = memory.getById(newShape.getId());
        memory.update(this.newShape);
    }

    @Override
    public void undo() {
        memory.update(this.oldShape);
    }
}