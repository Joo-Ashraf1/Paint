package com.PaintBackEnd.BackEnd.Services;

import com.PaintBackEnd.BackEnd.Commands.*;
import com.PaintBackEnd.BackEnd.Shapes.Shape;
import com.PaintBackEnd.BackEnd.Shapes.ShapeDTO;
import com.PaintBackEnd.BackEnd.Shapes.ShapesFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaintService {


    private final ShapesFactory factory = new ShapesFactory();
    private final Invoker invocer = new Invoker() ;

    public PaintService(){}

    public void draw (ShapeDTO dto){
        Shape shape = factory.makeShape(dto);
        invocer.execute(new Draw(shape));
    }

    public void delete(ShapeDTO dto){
        Shape shape = factory.makeShape(dto);
        shape.setId(dto.id);
        invocer.execute(new Delete(shape));
    }

    public void move(ShapeDTO dto){
        Shape shape = factory.makeShape(dto);
        shape.setId(dto.id);
        invocer.execute(new Move(shape));
    }

    public void undo(){
        invocer.undo();
    }

    public void redo(){
        invocer.redo();
    }

}
