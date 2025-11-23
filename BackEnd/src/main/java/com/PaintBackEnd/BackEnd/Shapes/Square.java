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

    public double getSide() {
        return side;
    }

    public void setSide(double side) {
        this.side = side;
    }
}
