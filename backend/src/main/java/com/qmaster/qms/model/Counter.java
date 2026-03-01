package com.qmaster.qms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "counters")
public class Counter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "counter_name", nullable = false)
    private String counterName;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private QmsService service;

    private Boolean status = true;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCounterName() { return counterName; }
    public void setCounterName(String counterName) { this.counterName = counterName; }
    public QmsService getService() { return service; }
    public void setService(QmsService service) { this.service = service; }
    public Boolean getStatus() { return status; }
    public void setStatus(Boolean status) { this.status = status; }
}
