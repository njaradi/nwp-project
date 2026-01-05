package com.example.be_nwp.services;

import com.example.be_nwp.model.Machine;
import com.example.be_nwp.model.State;
import com.example.be_nwp.repositories.MachineRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class MachineService implements IService<Machine, Long>{
    private final MachineRepository machineRepository;

    public MachineService(MachineRepository machineRepository) {
        this.machineRepository = machineRepository;
    }


    @Override
    public Machine save(Machine machine) {
        return machineRepository.save(machine);
    }

    @Override
    public Optional<Machine> findById(Long id) {
        return machineRepository.findById(id);
    }

    @Override
    public List<Machine> findAll() {
        return (List<Machine>) machineRepository.findAll();
    }

    public List<Machine> findByUserId(Long id) {
        return machineRepository.findByUserUserIdAndActiveTrue(id);
    }

    @Override
    public void deleteById(Long id) {
        machineRepository.deleteById(id);
    }


    public void turnOnMachine(Long machineId) throws InterruptedException {
        Machine m = machineRepository.findById(machineId).orElseThrow();
        m.setState(State.TURNING_ON);
        machineRepository.save(m);

        Thread.sleep(10000); // simulacija trajanja

        m.setState(State.RUNNING);
        machineRepository.save(m);
    }

    public void turnOffMachine(Long machineId) throws InterruptedException {
        Machine m = machineRepository.findById(machineId).orElseThrow();
        m.setState(State.TURNING_OFF);
        machineRepository.save(m);

        Thread.sleep(10000); // simulacija trajanja

        m.setState(State.STOPPED);
        machineRepository.save(m);
    }

    public void restartMachine(Long machineId) throws InterruptedException {
        Machine m = machineRepository.findById(machineId).orElseThrow();
        m.setState(State.RESTARTING);
        machineRepository.save(m);

        Thread.sleep(10000); // simulacija trajanja

        m.setState(State.RUNNING);
        machineRepository.save(m);
    }


    public boolean isOwner(Long machineId, Long userId) {
        return machineRepository
                .findById(machineId)
                .map(m -> m.getUser().getUserId().equals(userId))
                .orElse(false);
    }

    public List<Machine> filterMachines(
            Long userId,
            String role,
            String name,
            State state,
            LocalDate from,
            LocalDate to
    ) {
        LocalDateTime fromDateTime = from != null ? from.atStartOfDay() : null;
        LocalDateTime toDateTime = to != null ? to.atTime(23, 59, 59) : null;
        if(Objects.equals(role, "ADMIN"))
            return machineRepository.filterAllMachines(
                    name,
                    state,
                    fromDateTime,
                    toDateTime);
        else
            return machineRepository.filterMachines(
                userId,
                name,
                state,
                fromDateTime,
                toDateTime);
    }


}
