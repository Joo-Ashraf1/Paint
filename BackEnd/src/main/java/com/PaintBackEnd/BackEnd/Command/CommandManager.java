package com.PaintBackEnd.BackEnd.Command;

import java.util.Stack;

public class CommandManager {

    private static Stack<Command> redoStack = new Stack<>();
    private static Stack<Command> undoStack = new Stack<>();

    public void executeCommand(Command command) {
        command.execute();
        undoStack.push(command);
        redoStack.clear();
    }

    public void undo() {
        if (!undoStack.isEmpty()) {
            Command command = undoStack.pop();
            command.undo();
            redoStack.push(command);
        }
    }

    public void redo() {
        if(!redoStack.isEmpty())
        {
            Command command = redoStack.pop();
            command.execute();
            undoStack.push(command);
        }
    }

    public void clear() {
        redoStack.clear();
        undoStack.clear();
    }
}
