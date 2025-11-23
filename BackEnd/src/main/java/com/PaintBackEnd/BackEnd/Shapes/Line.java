package com.PaintBackEnd.BackEnd.Shapes;

import com.fasterxml.jackson.core.JsonProcessingException;

public class Line extends Shape {

    public Line(ShapeDTO dto) {
        super(dto);
        this.setShapeType("line");
    }
    public Line() {
        super();
        this.setShapeType("line");
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

}
