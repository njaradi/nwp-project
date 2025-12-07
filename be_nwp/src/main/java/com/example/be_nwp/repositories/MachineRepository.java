package com.example.be_nwp.repositories;

import org.springframework.data.repository.CrudRepository;
import com.example.be_nwp.model.Machine;
import org.springframework.stereotype.Repository;

@Repository
public interface MachineRepository extends CrudRepository<Machine, Long> {
}
