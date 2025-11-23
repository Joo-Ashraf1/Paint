package com.PaintBackEnd.BackEnd.Shapes;

import org.springframework.beans.factory.annotation.Autowired;

public abstract class Shape implements Cloneable {
    private String shapeType;
    private int id;
    private double x_start;
    private double y_start;
    private double x_end;
    private double y_end;
    private double xCenter;
    private double yCenter;
    private String fill;
    private String stroke;
    private int strokeWidth;
    private int rotation;

    @Autowired
    protected ShapeMapper mapper ;
    protected ShapesFactory factory ;

    public Shape(ShapeDTO dto) {
        this.shapeType = dto.shapeType;
        this.x_start = dto.x_start;
        this.y_start = dto.y_start;
        this.x_end = dto.x_end;
        this.y_end = dto.y_end;
        this.fill = dto.fill;
        this.stroke = dto.stroke;
        this.id = dto.id ;
        calculateCenter();
    }

    public Shape() {
    }

    public abstract Shape clone() ;

    private void calculateCenter() {
        this.xCenter = (this.x_end + this.x_start) / 2;
        this.yCenter = (this.y_end + this.y_start) / 2;
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
        calculateCenter();
    }

    public double getY_start() {
        return y_start;
    }

    public void setY_start(double y_start) {
        this.y_start = y_start;
        calculateCenter();
    }

    public double getX_end() {
        return x_end;
    }

    public void setX_end(double x_end) {
        this.x_end = x_end;
        calculateCenter();
    }

    public double getY_end() {
        return y_end;
    }

    public void setY_end(double y_end) {
        this.y_end = y_end;
        calculateCenter();
    }

    public double get_xCenter() {
        return this.xCenter;
    }

    public double get_yCenter() {
        return this.yCenter;
    }

    public void set_xCenter(double x) {
        this.xCenter = x;
    }

    public void set_yCenter(double y) {
        this.yCenter = y;
    }

    public String getFill() {
        return fill;
    }

    public void setFill(String fill) {
        this.fill = fill;
    }

    public String getStroke() {
        return stroke;
    }

    public void setStroke(String stroke) {
        this.stroke = stroke;
    }

    public int getStrokeWidth() {
        return strokeWidth;
    }

    public void setStrokeWidth(int strokeWidth) {
        this.strokeWidth = strokeWidth;
    }

    public int getRotation() {
        return rotation;
    }

    public void setRotation(int rotation) {
        this.rotation = rotation;
    }

}