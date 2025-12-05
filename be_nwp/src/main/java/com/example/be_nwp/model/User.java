package com.example.be_nwp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name="USER_ID")
    @Column
    private Long userId;

    @Column
    private String username;

    @Column
    private String password; //todo: sifrovano cuvati

    @Column
    private String email;

    @Column
    private Role role;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    @JsonIgnore
//    @ToString.Exclude
//    private List<Machine> machines;

}
