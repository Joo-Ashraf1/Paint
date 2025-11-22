package com.PaintBackEnd.BackEnd.Commands;

import com.PaintBackEnd.BackEnd.Memory.Memory;
import com.PaintBackEnd.BackEnd.Shapes.Shape;
import com.PaintBackEnd.BackEnd.Shapes.ShapesFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class Move implements Command {
    private double oldXStart , oldXEnd , oldYStart , OldYEnd;

    private Shape shape ;
    private final Memory memory = Memory.getInstance() ;


    @Autowired
    private ShapesFactory sFactory ;

    public Move(Shape shape){
        this.shape = shape;
    }

    @Override
    public void execute() {
        Shape oldShape = memory.getById(shape.getId());

        this.oldXStart =  oldShape.getX_start();
        this.oldXEnd = oldShape.getX_end();
        this.oldYStart =  oldShape.getY_start();
        this.OldYEnd = oldShape.getY_end();

        memory.updateShape(shape.getId() , shape);
    }

    @Override
    public void undo() {
        shape.setX_start(this.oldXStart);
        shape.setX_end(this.oldXEnd );
        shape.setY_start(this.oldYStart);
        shape.setY_end(this.OldYEnd);

        memory.updateShape(shape.getId() , shape);
    }
}
