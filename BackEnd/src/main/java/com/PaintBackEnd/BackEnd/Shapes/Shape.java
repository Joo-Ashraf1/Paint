package com.PaintBackEnd.BackEnd.Shapes;

public abstract class Shape implements Cloneable {
    private String shapeType;
    private int id;
    private double x_start;
    private double y_start;
    private double x_end;
    private double y_end;
    private String inColor;
    private String outColor;

    public Shape(ShapeDTO dto) {
        this.shapeType = dto.shapeType;
        this.x_start = dto.x_start;
        this.y_start = dto.y_start;
        this.x_end = dto.x_end;
        this.y_end = dto.y_end;
        this.inColor = dto.inColor;
        this.outColor = dto.outColor;
    }

    public Shape() {
    }


    public String getShapeType() {
        return shapeType;
    }

    public void setShapeType(String shapeType) {
        this.shapeType = shapeType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX_start() {
        return x_start;
    }

    public void setX_start(double x_start) {
        this.x_start = x_start;
    }

    public double getY_start() {
        return y_start;
    }

    public void setY_start(double y_start) {
        this.y_start = y_start;
    }

    public double getX_end() {
        return x_end;
    }

    public void setX_end(double x_end) {
        this.x_end = x_end;
    }

    public double getY_end() {
        return y_end;
    }

    public void setY_end(double y_end) {
        this.y_end = y_end;
    }

    public String getInColor() {
        return inColor;
    }

    public void setInColor(String inColor) {
        this.inColor = inColor;
    }

    public String getOutColor() {
        return outColor;
    }

    public void setOutColor(String outColor) {
        this.outColor = outColor;
    }
}
