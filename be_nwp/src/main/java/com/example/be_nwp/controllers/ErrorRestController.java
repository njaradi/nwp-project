package com.example.be_nwp.controllers;

import com.example.be_nwp.annotations.Authorized;
import com.example.be_nwp.model.ErrorMessage;
import com.example.be_nwp.services.ErrorService;
import com.example.be_nwp.utils.CurrentUserProvider;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/errors")
public class ErrorRestController {
    private final ErrorService errorService;
    private final CurrentUserProvider currentUserProvider;

    public ErrorRestController(ErrorService errorService, CurrentUserProvider currentUserProvider) {
        this.errorService = errorService;
        this.currentUserProvider = currentUserProvider;
    }
    @Authorized(roles = {"ADMIN"})
    @GetMapping(value = "/all",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ErrorMessage> getAllErrors() {return errorService.findAll();}

    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @GetMapping(value = "/my",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ErrorMessage> getMyErrors() {
        return errorService.findMyErrors(currentUserProvider.getUserId(),currentUserProvider.getRole());
    }

    @Authorized(roles = {"ADMIN","MODERATOR","USER"})
    @GetMapping(value ="/{id}" ,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getErrorById(@PathVariable("id") Long id) {
        Optional<ErrorMessage> optionalError = errorService.findById(id);
        if(optionalError.isPresent()) {
            return ResponseEntity.ok(optionalError.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ErrorMessage createError(@RequestBody ErrorMessage errorMessage) {
        return errorService.save(errorMessage);
    }


    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ErrorMessage updateError(@RequestBody ErrorMessage errorMessage) {
        return errorService.save(errorMessage);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteError(@PathVariable("id") Long id){
        errorService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
