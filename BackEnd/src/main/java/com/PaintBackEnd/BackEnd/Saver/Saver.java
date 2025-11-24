package com.PaintBackEnd.BackEnd.Saver;

import com.PaintBackEnd.BackEnd.Command.CommandManager;
import com.PaintBackEnd.BackEnd.Memory.Memory;
import com.PaintBackEnd.BackEnd.Shapes.Shape;
import com.PaintBackEnd.BackEnd.Shapes.ShapeDTO;
import com.PaintBackEnd.BackEnd.Shapes.ShapeMapper;
import com.PaintBackEnd.BackEnd.Shapes.ShapesFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Component
public class Saver {

    @Autowired
    ShapeMapper shapeMapper ;
    Memory memory = Memory.getInstance();

    CommandManager commandManager = CommandManager.getInstance();


    public void save(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");

        if (dotIndex == -1) {
            throw new IllegalArgumentException("file name must contain an extension");
        }

        String format = fileName.substring(dotIndex + 1).toLowerCase();

        List<ShapeDTO> dtos = memory.getAllDtos();

        try {
            if (format.equals("json")) {
                ObjectMapper jsonMapper = new ObjectMapper();
                jsonMapper.writerWithDefaultPrettyPrinter()
                        .writeValue(new File(fileName), dtos);
            } else if (format.equals("xml")) {
                XmlMapper xmlMapper = new XmlMapper();
                xmlMapper.writerWithDefaultPrettyPrinter()
                        .writeValue(new File(fileName), dtos);
            } else {
                throw new IllegalArgumentException("Unsupported format: " + format);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to save file: " + fileName);
        }
    }


    public void load(String fileName) {

        int dotIndex = fileName.lastIndexOf(".");

        if (dotIndex == -1) {
            throw new IllegalArgumentException("file name must contain an extension");
        }

        String format = fileName.substring(dotIndex + 1).toLowerCase();

        ObjectMapper mapper;

        if (format.equals("json")) {
            mapper = new ObjectMapper();
        }
        else if (format.equals("xml")) {
            mapper = new XmlMapper();
        }
        else {
            throw new IllegalArgumentException("Unsupported format: " + format);
        }

        try {
            ShapeDTO[] dtoArray = mapper.readValue(new File(fileName), ShapeDTO[].class);

            memory.clear();
            commandManager.clear();

            ShapesFactory factory = new ShapesFactory();

            for (ShapeDTO dto : dtoArray) {
                Shape shape = factory.makeShape(dto);
                memory.addShape(shape);
            }

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load file: " + fileName);
        }
    }

}
