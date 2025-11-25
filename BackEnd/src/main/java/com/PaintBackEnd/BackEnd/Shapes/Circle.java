package com.PaintBackEnd.BackEnd.Shapes;

import com.fasterxml.jackson.core.JsonProcessingException;

public class Circle extends Shape {
    private double radius;

    public Circle(ShapeDTO dto) {
        super(dto);
        this.radius = dto.radius;
        this.setShapeType("circle");
    }

    public Circle() {
        super();
        this.setShapeType("circle");
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
