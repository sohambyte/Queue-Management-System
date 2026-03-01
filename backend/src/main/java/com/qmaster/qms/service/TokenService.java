package com.qmaster.qms.service;

import com.qmaster.qms.model.*;
import com.qmaster.qms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TokenService {

    @Autowired private TokenRepository tokenRepository;
    @Autowired private QmsServiceRepository serviceRepository;
    @Autowired private CounterRepository counterRepository;

    @Transactional
    public Token generateToken(Long serviceId, String name, String phone) {
        QmsService qmsService = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        long currentCount = tokenRepository.countByService(qmsService);
        String prefix = qmsService.getServiceName().substring(0, 3).toUpperCase();
        String tokenNumber = String.format("%s-%03d", prefix, currentCount + 1);

        Token token = new Token();
        token.setTokenNumber(tokenNumber);
        token.setService(qmsService);
        token.setCustomerName(name);
        token.setPhone(phone);
        token.setStatus(TokenStatus.WAITING);
        token.setCreatedAt(LocalDateTime.now());

        return tokenRepository.save(token);
    }

    @Transactional
    public Token callNext(Long counterId) {
        Counter counter = counterRepository.findById(counterId)
                .orElseThrow(() -> new RuntimeException("Counter not found"));

        Token nextToken = tokenRepository.findFirstByServiceAndStatusOrderByCreatedAtAsc(counter.getService(), TokenStatus.WAITING)
                .orElseThrow(() -> new RuntimeException("No waiting tokens for this service"));

        nextToken.setStatus(TokenStatus.CALLED);
        nextToken.setCalledAt(LocalDateTime.now());
        nextToken.setCounter(counter);

        return tokenRepository.save(nextToken);
    }

    @Transactional
    public Token completeToken(Long tokenId) {
        Token token = tokenRepository.findById(tokenId).orElseThrow();
        token.setStatus(TokenStatus.COMPLETED);
        token.setCompletedAt(LocalDateTime.now());
        return tokenRepository.save(token);
    }

    public List<Token> getActiveTokens() {
        return tokenRepository.findByStatusIn(List.of(TokenStatus.WAITING, TokenStatus.CALLED));
    }
}
