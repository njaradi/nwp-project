package com.example.be_nwp.services;

import com.example.be_nwp.repositories.ErrorRepository;
import org.springframework.stereotype.Service;
import com.example.be_nwp.model.ErrorMessage;

import java.util.List;
import java.util.Optional;

@Service
public class ErrorService implements IService<ErrorMessage, Long> {
    private ErrorRepository errorRepository;

    public ErrorService(ErrorRepository errorRepository) {
        this.errorRepository = errorRepository;
    }

    @Override
    public ErrorMessage save(ErrorMessage errorMessage) {
        return errorRepository.save(errorMessage);
    }

    @Override
    public Optional<ErrorMessage> findById(Long id) {
        return errorRepository.findById(id);
    }

    @Override
    public List<ErrorMessage> findAll() {
        return (List<ErrorMessage>) errorRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        errorRepository.deleteById(id);
    }
}
