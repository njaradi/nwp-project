package com.example.be_nwp.repositories;

import com.example.be_nwp.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Modifying
    @Query("UPDATE User u SET u.active = false, u.role = 'DEACTIVATED' WHERE u.userId = :id")
    void deleteById(@Param("id") Long id);

    public User findByUsername(String username);
}