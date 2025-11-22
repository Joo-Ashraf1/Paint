package com.PaintBackEnd.BackEnd.Shapes;

public class Line extends Shape {

    public Line(ShapeDTO dto) {
        super(dto);
        this.setShapeType("line");
    }

}
