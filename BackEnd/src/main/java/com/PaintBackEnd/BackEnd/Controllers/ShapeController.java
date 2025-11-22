package com.PaintBackEnd.BackEnd.Controllers;

import com.PaintBackEnd.BackEnd.Memory.Memory;
import com.PaintBackEnd.BackEnd.Services.PaintService;
import com.PaintBackEnd.BackEnd.Shapes.Shape;
import com.PaintBackEnd.BackEnd.Shapes.ShapeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class ShapeController {
    @Autowired
    private PaintService paintsrv ;
    private final Memory mem = Memory.getInstance();

    @PostMapping("/draw")
    public void draw(@RequestBody ShapeDTO dto){
        paintsrv.draw(dto);
    }

    @GetMapping("/undo")
    public void undo(){
        paintsrv.undo();
    }

    @GetMapping("/redo")
    public void redo(){
        paintsrv.redo();
    }

    @PutMapping("/move")
    public void update(@RequestBody ShapeDTO shapeDTO){
        paintsrv.move(shapeDTO);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody ShapeDTO shapeDTO){
        paintsrv.delete(shapeDTO);
    }

    @GetMapping("/all")
    public List<Shape> getall(){
        return mem.getAllShapes();
    }


}
