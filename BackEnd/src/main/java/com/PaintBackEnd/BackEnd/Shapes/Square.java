package com.PaintBackEnd.BackEnd.Shapes;

import com.fasterxml.jackson.core.JsonProcessingException;

public class Square extends Shape {
    private double side;

    public Square(ShapeDTO dto) {
        super(dto);
        this.side = dto.side;
        this.setShapeType("square");
    }

    public Square() {
        super();
        this.setShapeType("square");
    }

    public double getSide() {
        return side;
    }

    public void setSide(double side) {
        this.side = side;
    }
}
