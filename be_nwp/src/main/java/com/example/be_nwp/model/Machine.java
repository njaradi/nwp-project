package com.example.be_nwp.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name="machines")
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long machineId;

    @Column
    private String name;
    @Column
    private State state;
    @Column
    @CreatedDate
    private LocalDateTime createdAt;

    @Column
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
