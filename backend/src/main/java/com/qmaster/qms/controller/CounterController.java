package com.qmaster.qms.controller;

import com.qmaster.qms.model.Counter;
import com.qmaster.qms.service.CounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/counters")
@CrossOrigin(origins = "*")
public class CounterController {

    @Autowired
    private CounterService counterService;

    @GetMapping
    public ResponseEntity<List<Counter>> getAll() {
        return ResponseEntity.ok(counterService.getAllCounters());
    }

    @PostMapping
    public ResponseEntity<Counter> create(@RequestBody Counter counter) {
        return new ResponseEntity<>(counterService.createCounter(counter), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Counter> toggleStatus(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(counterService.toggleCounterStatus(id));
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}