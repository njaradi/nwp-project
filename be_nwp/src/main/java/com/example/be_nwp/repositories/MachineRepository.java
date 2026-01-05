package com.example.be_nwp.repositories;

import com.example.be_nwp.model.State;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.example.be_nwp.model.Machine;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MachineRepository extends CrudRepository<Machine, Long> {

    List<Machine> findByUserUserIdAndActiveTrue(Long userId);

    @Query("SELECT m FROM Machine m WHERE m.active = true AND m.machineId = :id")
    Optional<Machine> findById(@Param("id") Long id);

    @Modifying
    @Query("UPDATE Machine m SET m.active = false WHERE m.machineId = :id")
    void deleteById(@Param("id") Long id);

    @Query("""
    SELECT m FROM Machine m
    WHERE m.user.userId = :userId
      AND (:name IS NULL OR LOWER(m.name) LIKE LOWER(CONCAT('%', :name, '%')))
      AND (:state IS NULL OR m.state = :state)
      AND (:from IS NULL OR m.created_at >= :from)
      AND (:to IS NULL OR m.created_at <= :to)
      AND (m.active = true)
""")
    List<Machine> filterMachines(
            @Param("userId") Long userId,
            @Param("name") String name,
            @Param("state") State state,
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to
    );

    @Query("""
    SELECT m FROM Machine m
    WHERE
       (:name IS NULL OR LOWER(m.name) LIKE LOWER(CONCAT('%', :name, '%')))
      AND (:state IS NULL OR m.state = :state)
      AND (:from IS NULL OR m.created_at >= :from)
      AND (:to IS NULL OR m.created_at <= :to)
      AND (m.active = true)
""")
    List<Machine> filterAllMachines(
            @Param("name") String name,
            @Param("state") State state,
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to
    );

}
