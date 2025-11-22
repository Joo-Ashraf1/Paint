package com.PaintBackEnd.BackEnd.Shapes;

public class Circle extends Shape {
    private double radius;

    public Circle(ShapeDTO dto) {
        super(dto);
        this.radius = dto.radius;
        this.setShapeType("circle");
    }

    public Circle() {

    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
