package com.qmaster.qms.repository;

import com.qmaster.qms.model.Token;
import com.qmaster.qms.model.TokenStatus;
import com.qmaster.qms.model.QmsService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findByStatusIn(List<TokenStatus> statuses);
    List<Token> findByServiceAndStatus(QmsService service, TokenStatus status);
    long countByService(QmsService service);
    
    // Find next waiting token for a service
    Optional<Token> findFirstByServiceAndStatusOrderByCreatedAtAsc(QmsService service, TokenStatus status);
}
