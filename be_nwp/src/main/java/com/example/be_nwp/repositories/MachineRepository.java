package com.example.be_nwp.repositories;

import org.springframework.data.repository.CrudRepository;
import com.example.be_nwp.model.Machine;
import org.springframework.stereotype.Repository;

@Repository
public interface MachineRepository extends CrudRepository<Machine, Long> {
    //pretraga po nazivu, stanju, pocetni datum, krajnji datum
    //napravi
    // unisti  4p

    // upali
    //ugasi
    //restart  4p



    //zakazivanje? da li to ovde ili negde drugde zakazemo pa odatle
    //samo pozovem neku od ovih operacija?  8p
}
