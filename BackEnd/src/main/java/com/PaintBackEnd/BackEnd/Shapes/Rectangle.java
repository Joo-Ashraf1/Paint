package com.PaintBackEnd.BackEnd.Shapes;

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
