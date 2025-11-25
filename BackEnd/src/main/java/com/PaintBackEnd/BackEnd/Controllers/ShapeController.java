package com.PaintBackEnd.BackEnd.Controllers;

import com.PaintBackEnd.BackEnd.Memory.Memory;
import com.PaintBackEnd.BackEnd.Services.PaintService;
import com.PaintBackEnd.BackEnd.Shapes.Shape;
import com.PaintBackEnd.BackEnd.Shapes.ShapeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ShapeController {
    @Autowired
    private PaintService paintsrv ;
    private final Memory mem = Memory.getInstance();

    @PostMapping("/draw")
    public ShapeDTO draw(@RequestBody ShapeDTO dto){
        paintsrv.draw(dto);
        return mem.lastDTOAdded() ;

    }

    @GetMapping("/undo")
    public List<ShapeDTO> undo(){
        paintsrv.undo();
        return mem.getAllDtos();
    }

    @GetMapping("/redo")
    public List<ShapeDTO> redo(){
        paintsrv.redo();
        return mem.getAllDtos();
    }

    @PutMapping("/update")
    public void update(@RequestBody ShapeDTO shapeDTO){
        paintsrv.update(shapeDTO);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody ShapeDTO shapeDTO){
        paintsrv.delete(shapeDTO);
    }

    @PostMapping("/copy")
    public ShapeDTO Copy(@RequestBody ShapeDTO shapeDTO) {
       paintsrv.copy(shapeDTO);
        System.out.println("Copy ShapeDTO : "+mem.lastDTOAdded().shapeType+"  "+ mem.lastDTOAdded().id);
       return mem.lastDTOAdded();
    }



    @GetMapping("/all")
    public List<ShapeDTO> getall(){
        return mem.getAllDtos();
    }
}