package com.PaintBackEnd.BackEnd.Memory;


import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


import com.PaintBackEnd.BackEnd.Shapes.Shape;
import com.PaintBackEnd.BackEnd.Shapes.ShapeDTO;
import com.PaintBackEnd.BackEnd.Shapes.ShapeMapper;


public class Memory {

    private static Memory memory;

    private ShapeMapper shapeMapper = new ShapeMapper() ;

    private LinkedHashMap<Integer, Shape> memoryShapes = new LinkedHashMap<>();
    private static int idCounter = 0;

    // Singleton
    private Memory() {
    }
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

    public ShapeDTO lastDTOAdded(){
        Shape lastValue = null;
        for (Map.Entry<Integer, Shape> entry : memoryShapes.entrySet()) {
            lastValue = entry.getValue();
        }
        return shapeMapper.toDto(lastValue);
    }

}