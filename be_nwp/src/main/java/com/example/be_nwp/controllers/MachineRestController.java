package com.example.be_nwp.controllers;

import com.example.be_nwp.annotations.Authorized;
import com.example.be_nwp.model.Machine;
import com.example.be_nwp.services.MachineService;
import org.springframework.http.HttpStatus;
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

    @Authorized(roles = {"ADMIN"})
    @GetMapping(value = "/all",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Machine> getAllMachines() {return machineService.findAll();};

    @Authorized(roles = {"ADMIN","MODERATOR","USER"}) //todo:mozda jos jedna metoda
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMachineById(@RequestParam("machineId") Long id) {
        Optional<Machine> optionalMachine = machineService.findById(id);
        if(optionalMachine.isPresent()) {
            return ResponseEntity.ok(optionalMachine.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Machine createMachine(@RequestBody Machine machine) {
        return machineService.save(machine);
    }

    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Machine updateMachine(@RequestBody Machine machine) {
        return machineService.save(machine);
    }

    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteMachine(@PathVariable("id") Long id){
        machineService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @PostMapping(value="/{id}/on", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> turnOnMachine(@PathVariable("id") Long id) throws InterruptedException {
        try {
            machineService.turnOnMachine(id);
            return ResponseEntity.ok("Machine running...");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to turn on machine");
        }
    }

    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @PostMapping(value="/{id}/off")
    public ResponseEntity<?> turnOffMachine(@PathVariable("id") Long id) throws InterruptedException {
        try {
            machineService.turnOffMachine(id);
            return ResponseEntity.ok("Machine stopped...");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to turn off machine");
        }
    }

    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @PostMapping(value="/{id}/restart")
    public ResponseEntity<?> restartMachine(@PathVariable("id") Long id) throws InterruptedException {
        try {
            machineService.restartMachine(id);
            return ResponseEntity.ok("Machine restarted...");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to restart machine");  // todo: ovde (i kasnije na zakazanim operacijama) ide Error Log
        }
    }

}
