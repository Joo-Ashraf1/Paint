package com.PaintBackEnd.BackEnd.Shapes;


import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ShapeMapper {
    public  ObjectMapper mapper = new ObjectMapper();

    public  ShapeDTO toDto(Shape s) throws JsonProcessingException {
        String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(s);
        return mapper.readValue(json, ShapeDTO.class);
    }

    

}
