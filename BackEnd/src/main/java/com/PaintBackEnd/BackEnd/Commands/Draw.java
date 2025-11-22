package com.PaintBackEnd.BackEnd.Commands;

import com.PaintBackEnd.BackEnd.Memory.Memory;
import com.PaintBackEnd.BackEnd.Shapes.Shape;
import com.PaintBackEnd.BackEnd.Shapes.ShapesFactory;
import org.springframework.beans.factory.annotation.Autowired;


public class Draw implements Command{
    private Shape shape ;
    private final Memory memory = Memory.getInstance() ;


    @Autowired
    private ShapesFactory sFactory ;

    public Draw(Shape shape){

        this.shape = shape;
    }

    @Override
    public void execute() {
        memory.addShape(shape);
    }

    @Override
    public void undo() {
        memory.deleteShape(shape.getId());
    }
}
