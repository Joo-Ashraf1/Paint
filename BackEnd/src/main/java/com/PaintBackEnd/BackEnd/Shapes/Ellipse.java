package com.PaintBackEnd.BackEnd.Shapes;

public class Ellipse extends Shape {
    private double radius_x;
    private double radius_y;

    public Ellipse(ShapeDTO dto) {
        super(dto);
        this.radius_x = dto.radius_x;
        this.radius_y = dto.radius_y;
        this.setShapeType("ellipse");
    }

    public Ellipse() {

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
