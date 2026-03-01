package com.qmaster.qms.service;

import com.qmaster.qms.model.Counter;
import com.qmaster.qms.repository.CounterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CounterService {

    @Autowired
    private CounterRepository counterRepository;

    public List<Counter> getAllCounters() {
        return counterRepository.findAll();
    }

    @Transactional
    public Counter createCounter(Counter counter) {
        return counterRepository.save(counter);
    }

    @Transactional
    public Counter toggleCounterStatus(Long id) {
        Counter counter = counterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Counter not found"));
        counter.setStatus(!counter.getStatus());
        return counterRepository.save(counter);
    }
}