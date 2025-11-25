package com.PaintBackEnd.BackEnd.Shapes;

import com.fasterxml.jackson.core.JsonProcessingException;

public class Triangle extends Shape {
 private double side;

    public Triangle(ShapeDTO dto) {
        super(dto);
        this.side = dto.side;
        this.setShapeType("triangle");
    }

    public Triangle() {
        super();
        this.setShapeType("triangle");
    }

    public double getSide() {
        return side;
    }

    public void setSide(double side) {
        this.side = side;
    }
}
