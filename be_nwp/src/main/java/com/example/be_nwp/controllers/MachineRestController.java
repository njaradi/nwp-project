package com.example.be_nwp.controllers;

import com.example.be_nwp.model.Machine;
import com.example.be_nwp.services.MachineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/machines")
public class MachineRestController {
    private final MachineService machineService;

    public MachineRestController(MachineService machineService) {
        this.machineService = machineService;
    }

    @GetMapping(value = "/all",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Machine> getAllMachines() {return machineService.findAll();};

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMachineById(@RequestParam("machineId") Long id) {
        Optional<Machine> optionalMachine = machineService.findById(id);
        if(optionalMachine.isPresent()) {
            return ResponseEntity.ok(optionalMachine.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Machine createMachine(@RequestBody Machine machine) {
        return machineService.save(machine);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Machine updateMachine(@RequestBody Machine machine) {
        return machineService.save(machine);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteMachine(@PathVariable("id") Long id){
        machineService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
