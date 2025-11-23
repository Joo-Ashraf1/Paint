package com.PaintBackEnd.BackEnd.Command;

import com.PaintBackEnd.BackEnd.Shapes.Shape;
import org.springframework.stereotype.Component;

@Component
public class CommandFactory {
    public Command makeCommand(String command , Shape shape) {
        switch (command) {
            case "draw":
                return new Draw(shape);
            case "update":
                return new Update(shape);
            case "delete":
                return new Delete(shape);
            case "copy":
                return new Copy(shape);
            default:
                return null;
        }
    }
}
