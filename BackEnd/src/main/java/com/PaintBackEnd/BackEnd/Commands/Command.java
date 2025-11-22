package com.PaintBackEnd.BackEnd.Commands;

import com.PaintBackEnd.BackEnd.Shapes.ShapeDTO;

public interface Command {
    public void execute();
    public void undo();
}
