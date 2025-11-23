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

    public Shape clone() {
        ShapeDTO dto;
        dto = super.mapper.toDto(this);
        dto.id = 0;
        dto.x_end += 3;
        dto.y_end += 3;
        dto.x_start += 3;
        dto.y_start += 3;
        return super.factory.makeShape(dto);
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
