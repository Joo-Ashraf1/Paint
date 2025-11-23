package com.PaintBackEnd.BackEnd.Shapes;


import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ShapeMapper {
    public final ObjectMapper mapper = new ObjectMapper();

    public ShapeDTO toDto(Shape s) {
        if (s == null) return null;
        ShapeDTO dto = new ShapeDTO();
        dto.shapeType = s.getShapeType();
        dto.id = s.getId();
        dto.rotation = s.getRotation();
        dto.x_start = s.getX_start();
        dto.y_start = s.getY_start();
        dto.x_end = s.getX_end();
        dto.y_end = s.getY_end();
        dto.fill = s.getFill();
        dto.stroke = s.getStroke();
        dto.strokeWidth = s.getStrokeWidth();

        if (s instanceof Circle c) {
            dto.radius = c.getRadius();
        }
        else if (s instanceof Rectangle r) {
            dto.width = r.getWidth();
            dto.height = r.getHeight();
        }
        else if (s instanceof Ellipse e) {
            dto.radius_x = e.getRadius_x();
            dto.radius_y = e.getRadius_y();
        }
        else if (s instanceof Square sq) {
            dto.side = sq.getSide();
        }
        else if (s instanceof Line) {

        }
        else if (s instanceof Triangle t) {
            dto.side = t.getSide();
        }
        return dto;
    }


}
