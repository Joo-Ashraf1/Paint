package com.PaintBackEnd.BackEnd.Services;

import com.PaintBackEnd.BackEnd.Command.*;
import com.PaintBackEnd.BackEnd.Shapes.Shape;
import com.PaintBackEnd.BackEnd.Shapes.ShapeDTO;
import com.PaintBackEnd.BackEnd.Shapes.ShapesFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaintService {


    private final ShapesFactory shapesFactory = new ShapesFactory();
    private final CommandFactory commandFactory = new CommandFactory();
    private final CommandManager commandManager = CommandManager.getInstance() ;

    public PaintService(){}

    public void draw (ShapeDTO dto) throws CloneNotSupportedException {
        dto.id = 0 ;
        Shape shape = shapesFactory.makeShape(dto);
        Command command = commandFactory.makeCommand("draw" , shape) ;
        commandManager.executeCommand(command);
    }

    public void delete(ShapeDTO dto) throws CloneNotSupportedException {
        Shape shape = shapesFactory.makeShape(dto);
        Command command = commandFactory.makeCommand("delete" , shape) ;
        commandManager.executeCommand(command);
    }

    public void update(ShapeDTO dto) throws CloneNotSupportedException {
        Shape shape = shapesFactory.makeShape(dto);
        Command command = commandFactory.makeCommand("update" , shape) ;
        commandManager.executeCommand(command);
    }

    public void copy(ShapeDTO dto) throws CloneNotSupportedException {
        Shape shape = shapesFactory.makeShape(dto);
        Command command = commandFactory.makeCommand("copy" , shape) ;
        commandManager.executeCommand(command);
    }

    public void undo(){
        commandManager.undo();
    }

    public void redo(){
        commandManager.redo();
    }

}
