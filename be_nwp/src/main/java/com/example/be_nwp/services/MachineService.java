package com.example.be_nwp.services;

import com.example.be_nwp.model.Machine;
import com.example.be_nwp.repositories.MachineRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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

    @Override
    public void deleteById(Long id) {
        machineRepository.deleteById(id);
    }
}
