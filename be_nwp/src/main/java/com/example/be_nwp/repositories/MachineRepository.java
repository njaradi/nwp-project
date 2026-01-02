package com.example.be_nwp.repositories;

import org.springframework.data.repository.CrudRepository;
import com.example.be_nwp.model.Machine;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MachineRepository extends CrudRepository<Machine, Long> {
    //@Query("SELECT m FROM Machine m WHERE m.user = :userId")
    List<Machine> findByUserUserId(Long userId);
}
