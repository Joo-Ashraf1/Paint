package com.PaintBackEnd.BackEnd.Shapes;

public class Triangle extends Shape {

    public Triangle(ShapeDTO dto) {
        super(dto);
        this.setShapeType("triangle");
    }
}
