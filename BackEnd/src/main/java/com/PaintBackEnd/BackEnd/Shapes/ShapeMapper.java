package com.PaintBackEnd.BackEnd.Shapes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ShapeMapper {
    public static ObjectMapper mapper = new ObjectMapper();

    public static ShapeDTO toDto(Shape s) throws JsonProcessingException {
        String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(s);
        return mapper.readValue(json, ShapeDTO.class);
    }

}
