package com.example.be_nwp.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name="scheduled_operations")
public class ScheduledOperation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduledId;

    @ManyToOne
    @JoinColumn(name = "machine_id")
    private Machine machine;

    @Enumerated(EnumType.STRING)
    @Column
    private Operation operation;

    @Enumerated(EnumType.STRING)
    @Column
    private Status status;

    @Column
    private String cron;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;
}
