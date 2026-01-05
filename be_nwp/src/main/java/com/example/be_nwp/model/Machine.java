package com.example.be_nwp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name="machines")
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long machineId;

    @Column
    private String name;
    @Enumerated(EnumType.STRING)
    @Column
    private State state;

    @Column
    @CreationTimestamp
    private LocalDateTime created_at;

    @Column
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "machine", cascade = CascadeType.ALL)
    @JsonIgnore
    @ToString.Exclude
    private List<ScheduledOperation> scheduledOperations;

}
