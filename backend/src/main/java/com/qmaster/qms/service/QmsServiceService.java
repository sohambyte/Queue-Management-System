package com.qmaster.qms.service;

import com.qmaster.qms.model.QmsService;
import com.qmaster.qms.repository.QmsServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class QmsServiceService {

    @Autowired
    private QmsServiceRepository serviceRepository;

    public List<QmsService> getAllServices() {
        return serviceRepository.findAll();
    }

    public Optional<QmsService> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    @Transactional
    public QmsService createService(QmsService service) {
        return serviceRepository.save(service);
    }

    @Transactional
    public QmsService updateService(Long id, QmsService details) {
        QmsService service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));
        service.setServiceName(details.getServiceName());
        service.setDescription(details.getDescription());
        service.setAverageTimeMinutes(details.getAverageTimeMinutes());
        service.setStatus(details.getStatus());
        return serviceRepository.save(service);
    }

    @Transactional
    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}