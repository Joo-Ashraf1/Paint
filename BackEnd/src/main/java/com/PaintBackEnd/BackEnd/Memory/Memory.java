package com.PaintBackEnd.BackEnd.Memory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.PaintBackEnd.BackEnd.Shapes.Shape;

public class Memory {

    private static Memory memory;

    private HashMap<Integer, Shape> memoryShapes = new HashMap<>();
    private static int idCounter = 0;

    private Memory() {
    }

    // Singleton
    public static Memory getInstance() {
        if (memory == null)
            memory = new Memory();
        return memory;
    }

    public int addShape(Shape shape) {
        incrementIdCounter();
        if (shape.getId() == 0) //////////
            shape.setId(idCounter);
        memoryShapes.put(idCounter, shape);
        return shape.getId();
    }

    public Shape deleteShape(Shape shape) {
        return memoryShapes.remove(shape.getId());
    }

    public void update(Shape shape) {
        memoryShapes.replace(shape.getId(), shape);
    }

    public Shape getById(int shapeId) {
        return memoryShapes.get(shapeId);
    }

    public List<Shape> getAllShapes() {
        return new ArrayList<>(memoryShapes.values());
    }

    private void incrementIdCounter() {
        idCounter++;
    }

    public void clear() {
        memoryShapes.clear();
    }
}