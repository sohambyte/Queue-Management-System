package com.qmaster.qms.repository;

import com.qmaster.qms.model.QmsService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QmsServiceRepository extends JpaRepository<QmsService, Long> {
}
