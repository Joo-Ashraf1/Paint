package com.PaintBackEnd.BackEnd.Shapes;

import org.springframework.stereotype.Component;

@Component
public class ShapesFactory {
    public Shape makeShape(ShapeDTO dto) {
        switch (dto.shapeType.toLowerCase()) {
            case "circle":
                return new Circle(dto);
            case "square":
                return new Square(dto);
            case "rectangle":
                return new Rectangle(dto);
            case "ellipse":
                return new Ellipse(dto);
            case "line":
                return new Line(dto);
            case "triangle":
                return new Triangle(dto);
            default:
                return null;
        }
    }
}
