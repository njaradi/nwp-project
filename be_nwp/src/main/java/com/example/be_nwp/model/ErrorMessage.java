package com.example.be_nwp.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name="errors")
public class ErrorMessage {
    @Id
    @GeneratedValue
    private Long errorId;

    @Column
    @CreatedDate
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "machine_id")
    private Machine machine;

    @Enumerated(EnumType.STRING)
    @Column
    private Operation operation;

    @Column
    private String message;
}
