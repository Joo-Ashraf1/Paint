package com.PaintBackEnd.BackEnd.Memory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.PaintBackEnd.BackEnd.Shapes.Shape;
import com.PaintBackEnd.BackEnd.Shapes.ShapeDTO;
import com.PaintBackEnd.BackEnd.Shapes.ShapeMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

public class Memory {

    private static Memory memory;

    private ShapeMapper shapeMapper = new ShapeMapper() ;

    private HashMap<Integer, Shape> memoryShapes = new HashMap<>();
    private static int idCounter = 0;

    private Memory() {
    }

    // Singleton
    public static synchronized Memory getInstance() {
        if (memory == null)
            memory = new Memory();
        return memory;
    }

    public int addShape(Shape shape) {
        if (shape.getId() == 0)
        {
            incrementIdCounter();
            shape.setId(idCounter);
        }
        memoryShapes.put(shape.getId(), shape);
        return shape.getId();
    }


    public Shape deleteShape(Shape shape) {
        if (shape == null) return null;
        return memoryShapes.remove(shape.getId());
    }

    public void update(Shape shape) {
        if (shape == null) return;
        memoryShapes.replace(shape.getId(), shape);
    }

    public Shape getById(int shapeId) {
        return memoryShapes.get(shapeId);
    }

    public List<Shape> getAllShapes() {
        return new ArrayList<>(memoryShapes.values());
    }

    public List<ShapeDTO> getAllDtos()
    {
        List<Shape> shapes = getAllShapes() ;
        List<ShapeDTO> dtos = new ArrayList<>(shapes.size());
        for (Shape s : shapes) {
            dtos.add(shapeMapper.toDto(s));
        }
        return dtos ;
    }


    private void incrementIdCounter() {
        idCounter++;
    }

    public void clear() {
        memoryShapes.clear();
        idCounter = 0;
    }
}