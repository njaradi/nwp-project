package com.example.be_nwp.controllers;

import com.example.be_nwp.model.ScheduledOperation;
import com.example.be_nwp.services.ScheduledOperationService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/schedule")
public class ScheduledOperationController {
    private final ScheduledOperationService scheduledOperationService;

    public ScheduledOperationController(ScheduledOperationService scheduledOperationService) {
        this.scheduledOperationService = scheduledOperationService;
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
    public ScheduledOperation create(@RequestBody ScheduledOperation op) {
        return scheduledOperationService.createAndSchedule(op);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        scheduledOperationService.cancel(id);
    }
}
