package com.example.be_nwp.repositories;

import com.example.be_nwp.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    public User findByUsername(String username);
}
//todo: ovde vrv ne moze krud samo, posto imamo permisije