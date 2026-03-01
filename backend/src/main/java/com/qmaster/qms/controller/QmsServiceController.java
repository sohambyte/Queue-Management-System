package com.qmaster.qms.controller;

import com.qmaster.qms.model.QmsService;
import com.qmaster.qms.service.QmsServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class QmsServiceController {

    @Autowired
    private QmsServiceService serviceService;

    @GetMapping
    public ResponseEntity<List<QmsService>> getAll() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    @PostMapping
    public ResponseEntity<QmsService> create(@RequestBody QmsService service) {
        QmsService created = serviceService.createService(service);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QmsService> update(@PathVariable Long id, @RequestBody QmsService details) {
        try {
            return ResponseEntity.ok(serviceService.updateService(id, details));
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}