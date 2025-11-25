package com.PaintBackEnd.BackEnd.Controllers;

import com.PaintBackEnd.BackEnd.Memory.Memory;
import com.PaintBackEnd.BackEnd.Saver.Saver;
import com.PaintBackEnd.BackEnd.Shapes.ShapeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SaveController {
    private Saver saver = new Saver() ;
    private final Memory mem = Memory.getInstance();

    @PostMapping("/save")
    public String save(@RequestBody String path){
        try {
            saver.save(path);
            return "success";
        } catch (Exception e) {
            return "fail" ;
        }
    }

    @PostMapping("/load")
    public List<ShapeDTO> load(@RequestBody String path){
        try {
            saver.load(path);
            return mem.getAllDtos();
        } catch (Exception e) {
            return null ;
        }
    }

}