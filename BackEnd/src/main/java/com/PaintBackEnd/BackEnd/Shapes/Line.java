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



}
