package com.PaintBackEnd.BackEnd.Command;

import com.PaintBackEnd.BackEnd.Memory.Memory;

public abstract class Command {
    protected final Memory memory = Memory.getInstance();

    public abstract void execute();

    public abstract void undo();
}