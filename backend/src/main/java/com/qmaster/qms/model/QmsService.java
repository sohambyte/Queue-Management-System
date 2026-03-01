package com.qmaster.qms.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "services")
public class QmsService implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_name", nullable = false)
    private String serviceName;

    private String description;

    @Column(name = "average_time_minutes")
    private Integer averageTimeMinutes = 15;

    private Boolean status = true;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getAverageTimeMinutes() { return averageTimeMinutes; }
    public void setAverageTimeMinutes(Integer averageTimeMinutes) { this.averageTimeMinutes = averageTimeMinutes; }
    public Boolean getStatus() { return status; }
    public void setStatus(Boolean status) { this.status = status; }
}
