package com.example.be_nwp.services;

import com.example.be_nwp.model.Machine;
import com.example.be_nwp.model.Operation;
import com.example.be_nwp.model.ScheduledOperation;
import com.example.be_nwp.repositories.ScheduledOperationRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

@Service
public class ScheduledOperationService {
    private final TaskScheduler taskScheduler;
    private final ScheduledOperationRepository scheduledOperationRepository;
    private final MachineService machineService;

    private final Map<Long, ScheduledFuture<?>> runningTasks = new HashMap<>();

    public ScheduledOperationService(TaskScheduler taskScheduler, ScheduledOperationRepository scheduledOperationRepository, MachineService machineService) {
        this.taskScheduler = taskScheduler;
        this.scheduledOperationRepository = scheduledOperationRepository;
        this.machineService = machineService;
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
            System.out.println("Executing operation: " + operation);//maybe get rid of this line at the end

            if(operation == Operation.ON) {
                try {
                    machineService.turnOnMachine(machine.getMachineId());
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);//todo: error thing
                }
            }
            else if(operation == Operation.OFF) {
                try {
                    machineService.turnOffMachine(machine.getMachineId());
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
            else if(operation == Operation.RESTART) {
                try {
                    machineService.restartMachine(machine.getMachineId());
                } catch (InterruptedException e) {
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
    public void rescheduleAll() {//todo: ?????? pogledaj kasnije
        scheduledOperationRepository.findAll().forEach(this::schedule);
    }
}