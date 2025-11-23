package com.PaintBackEnd.BackEnd.Shapes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;


@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class ShapeDTO {

    public String shapeType;
    public int id;
    public int rotation;

    // WHERE IN DRAWING AREA
    public double x_start;
    public double y_start;

    public double x_end;
    public double y_end;

    // COLOR
    public String fill;
    public String stroke;
    public int strokeWidth;

    // SQUARE // TRIANGLE
    public double side;

    // RECTANGLE
    public double width;
    public double height;

    // CIRCLE
    public double radius;

    // ELLIPSE
    public double radius_x;
    public double radius_y;

}