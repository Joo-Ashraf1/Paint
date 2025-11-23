package com.PaintBackEnd.BackEnd.Shapes;

import com.fasterxml.jackson.core.JsonProcessingException;

public class Rectangle extends Shape {
    private double width;
    private double height;

    public Rectangle(ShapeDTO dto) {
        super(dto);
        this.height = dto.height;
        this.width = dto.width;
        this.setShapeType("rectangle");
    }

    public Rectangle() {

    }

    public Shape clone() {
        ShapeDTO dto;
        try {
            dto = super.mapper.toDto(this);
            dto.id = 0;
            dto.x_end += 3;
            dto.y_end += 3;
            dto.x_start += 3;
            dto.y_start += 3;
            return super.factory.makeShape(dto);
        } catch (JsonProcessingException e) {

            e.printStackTrace();
            return null;
        }

    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }
}
