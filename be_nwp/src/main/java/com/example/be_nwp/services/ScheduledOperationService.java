package com.example.be_nwp.services;

import com.example.be_nwp.model.*;
import com.example.be_nwp.repositories.ScheduledOperationRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

@Service
public class ScheduledOperationService {
    private final TaskScheduler taskScheduler;
    private final ScheduledOperationRepository scheduledOperationRepository;
    private final MachineService machineService;
    private final ErrorService errorService;

    private final Map<Long, ScheduledFuture<?>> runningTasks = new HashMap<>();

    public ScheduledOperationService(TaskScheduler taskScheduler, ScheduledOperationRepository scheduledOperationRepository, MachineService machineService, ErrorService errorService) {
        this.taskScheduler = taskScheduler;
        this.scheduledOperationRepository = scheduledOperationRepository;
        this.machineService = machineService;
        this.errorService = errorService;
    }

    public ScheduledOperation createAndSchedule(ScheduledOperation op) {
        ScheduledOperation saved = scheduledOperationRepository.save(op);
        schedule(saved);
        return saved;
    }

    private void schedule(ScheduledOperation op) {
        Runnable task = () -> {
            Operation operation = op.getOperation();
            Machine machine = op.getMachine();
            ErrorMessage errorMessage = new ErrorMessage();
            errorMessage.setOperation(operation);
            errorMessage.setMachine(machine);
            errorMessage.setTimestamp(LocalDateTime.now());
            System.out.println("Executing operation: " + operation);//maybe get rid of this line at the end

            if(operation == Operation.ON) {
                try {
                    if(machine.getState() == State.STOPPED)
                        machineService.turnOnMachine(machine.getMachineId());
                    else
                    {
                        errorMessage.setMessage("Tried turning on but machine is not in state STOPPED");
                        errorService.save(errorMessage);
                    }
                } catch (InterruptedException e) {
                    errorMessage.setMessage(e.getMessage());
                    errorService.save(errorMessage);
                    throw new RuntimeException(e);
                }
            }
            else if(operation == Operation.OFF) {
                try {
                    if(machine.getState()  == State.RUNNING)
                        machineService.turnOffMachine(machine.getMachineId());
                    else{
                        errorMessage.setMessage("Tried turning on but machine is not in state RUNNING");
                        errorService.save(errorMessage);
                    }
                } catch (InterruptedException e) {
                    errorMessage.setMessage(e.getMessage());

                    errorService.save(errorMessage);
                    throw new RuntimeException(e);
                }
            }
            else if(operation == Operation.RESTART) {
                try {
                    if(machine.getState() == State.RUNNING || machine.getState() == State.CRASHED)
                        machineService.restartMachine(machine.getMachineId());
                    else {
                        errorMessage.setMessage("Tried turning on but machine is not in state RUNNING nor CRASHED");
                        errorService.save(errorMessage);
                    }
                } catch (InterruptedException e) {
                    errorMessage.setMessage(e.getMessage());

                    errorService.save(errorMessage);
                    throw new RuntimeException(e);
                }
            }
        };

        ScheduledFuture<?> future = taskScheduler.schedule(
                task,
                new CronTrigger(op.getCron())
        );

        runningTasks.put(op.getScheduledId(), future);
    }

    public void cancel(Long id) {
        ScheduledFuture<?> future = runningTasks.get(id);
        if (future != null) {
            future.cancel(false);
            runningTasks.remove(id);
        }
        scheduledOperationRepository.deleteById(id);
    }

    @PostConstruct
    public void rescheduleAll() {
        scheduledOperationRepository.findAll().forEach(this::schedule);
    }
}