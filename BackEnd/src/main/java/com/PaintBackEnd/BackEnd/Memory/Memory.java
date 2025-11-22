package com.PaintBackEnd.BackEnd.Memory;

import com.PaintBackEnd.BackEnd.Shapes.Shape;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Memory {
    private HashMap<Integer, Shape> shapes = new HashMap<>();
    private int idCounter = 1;

    // For Singleton
    private static Memory memory = null;

    private Memory() {
    }

    public static Memory getInstance() {
        if (memory == null) memory =  new Memory();

        return memory;

    }

    public void addShape(Shape s) {
        if (s.getId() == 0) {
            s.setId(idCounter++);
        }
        shapes.put(s.getId(), s);
    }

    public void updateShape(int id, Shape s) {
        shapes.put(id, s);
    }

    public void deleteShape(int id) {
        shapes.remove(id);
    }

    public Shape getById(int id) {
        return shapes.get(id);
    }

    public List<Shape> getAllShapes() {
        return new ArrayList<>(shapes.values());
    }
}
