package com.PaintBackEnd.BackEnd.Shapes;

import com.fasterxml.jackson.core.JsonProcessingException;

public class Ellipse extends Shape {
    private double radius_x;
    private double radius_y;

    public Ellipse(ShapeDTO dto) {
        super(dto);
        this.radius_x = dto.x_radius;
        this.radius_y = dto.y_radius;
        this.setShapeType("ellipse");
    }

    public Ellipse() {

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
            return null ;
        }

    }

    public double getRadius_x() {
        return radius_x;
    }

    public void setRadius_x(double radius_x) {
        this.radius_x = radius_x;
    }

    public double getRadius_y() {
        return radius_y;
    }

    public void setRadius_y(double radius_y) {
        this.radius_y = radius_y;
    }
}
