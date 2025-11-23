package com.PaintBackEnd.BackEnd.Services;

import com.PaintBackEnd.BackEnd.Command.*;
import com.PaintBackEnd.BackEnd.Shapes.Shape;
import com.PaintBackEnd.BackEnd.Shapes.ShapeDTO;
import com.PaintBackEnd.BackEnd.Shapes.ShapesFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaintService {


    private final ShapesFactory factory = new ShapesFactory();
    private final CommandManager commandManager = new CommandManager() ;

    public PaintService(){}

    public void draw (ShapeDTO dto){
        dto.id = 0 ;
        Shape shape = factory.makeShape(dto);
        commandManager.executeCommand(new Draw(shape));
    }

    public void delete(ShapeDTO dto){
        Shape shape = factory.makeShape(dto);
        commandManager.executeCommand(new Delete(shape));
    }

    public void update(ShapeDTO dto){
        Shape shape = factory.makeShape(dto);
        commandManager.executeCommand(new Update(shape));
    }

    public void copy(ShapeDTO dto){
        Shape shape = factory.makeShape(dto);
        commandManager.executeCommand(new Copy(shape));
    }

    public void undo(){
        commandManager.undo();
    }

    public void redo(){
        commandManager.redo();
    }

}
