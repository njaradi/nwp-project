package com.example.be_nwp.repositories;

import com.example.be_nwp.model.ErrorMessage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ErrorRepository extends CrudRepository<ErrorMessage, Long> {

    List<ErrorMessage> findByMachineUserUserId(Long userId);
}
