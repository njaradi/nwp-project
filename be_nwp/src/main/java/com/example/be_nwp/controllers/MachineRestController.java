package com.example.be_nwp.controllers;

import com.example.be_nwp.annotations.Authorized;
import com.example.be_nwp.annotations.OwnsMachine;
import com.example.be_nwp.model.Machine;
import com.example.be_nwp.model.State;
import com.example.be_nwp.model.User;
import com.example.be_nwp.services.MachineService;
import com.example.be_nwp.utils.CurrentUserProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/machines")
public class MachineRestController {
    private final MachineService machineService;
    private final CurrentUserProvider currentUserProvider;

    public MachineRestController(MachineService machineService, CurrentUserProvider currentUserProvider) {
        this.machineService = machineService;
        this.currentUserProvider = currentUserProvider;
    }

    @Authorized(roles = {"ADMIN"})
    @GetMapping(value = "/all",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Machine> getAllMachines() {return machineService.findAll();}

    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @GetMapping(value = "/my",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Machine> getMyMachines() {
        Long currentUserId = currentUserProvider.getUserId();
        return machineService.findByUserId(currentUserId);
    }

    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @GetMapping(value = "/my/filter", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Machine> filterMyMachines(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) State state,
            @RequestParam(required = false) LocalDate from,
            @RequestParam(required = false) LocalDate to
    ) {
        Long userId = currentUserProvider.getUserId();
        return machineService.filterMachines(userId, name, state, from, to);
    }


    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @OwnsMachine
    @GetMapping(value ="/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMachineById(@PathVariable("id") Long id) {
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
        User user = new User();
        user.setUserId(currentUserProvider.getUserId());
        machine.setUser(user);
        return machineService.save(machine);
    }

    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @OwnsMachine
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Machine updateMachine(@RequestBody Machine machine) {
        return machineService.save(machine);
    }

    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @OwnsMachine
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteMachine(@PathVariable("id") Long id){
        machineService.deleteById(id);
        return ResponseEntity.ok().build();
    }


    @MessageMapping("/machines/{id}/on")
    @SendTo("/topic/machines")
    public ResponseEntity<?> turnOnMachine(@DestinationVariable Long id){
        try {
            machineService.turnOnMachine(id);
            return ResponseEntity.ok("Machine running...");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to turn on machine");
        }
    }

    @MessageMapping("/machines/{id}/off")
    @SendTo("/topic/machines")
    public ResponseEntity<?> turnOffMachine(@DestinationVariable Long id) {
        try {
            machineService.turnOffMachine(id);
            return ResponseEntity.ok("Machine stopped...");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to turn off machine");
        }
    }

    @MessageMapping("/machines/{id}/restart")
    @SendTo("/topic/machines")
    public ResponseEntity<?> restartMachine(@DestinationVariable Long id){
        try {
            machineService.restartMachine(id);
            return ResponseEntity.ok("Machine restarted...");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to restart machine");  // todo: ovde (i kasnije na zakazanim operacijama) ide Error Log
        }
    }

}
