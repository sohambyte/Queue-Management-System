
package com.example.queue.controller;

import com.example.queue.model.Token;
import com.example.queue.model.TokenStatus;
import com.example.queue.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tokens")
@CrossOrigin(origins = "http://localhost:3000")
public class TokenController {

    @Autowired
    private TokenRepository tokenRepository;

    @PostMapping("/generate")
    public Token generateToken(@RequestBody Token tokenRequest) {
        // Logic to generate unique token number based on service
        tokenRequest.setStatus(TokenStatus.WAITING);
        tokenRequest.setCreatedAt(LocalDateTime.now());
        return tokenRepository.save(tokenRequest);
    }

    @GetMapping("/active")
    public List<Token> getActiveTokens() {
        return tokenRepository.findByStatusIn(List.of(TokenStatus.WAITING, TokenStatus.CALLED));
    }

    @PostMapping("/call-next/{counterId}")
    public Token callNextToken(@PathVariable Long counterId) {
        // Find next waiting token for the service assigned to this counter
        // Update status to CALLED and set calledAt = now()
        // ... implementation details
        return null; 
    }

    @PostMapping("/{id}/complete")
    public Token completeToken(@PathVariable Long id) {
        Token token = tokenRepository.findById(id).orElseThrow();
        token.setStatus(TokenStatus.COMPLETED);
        token.setCompletedAt(LocalDateTime.now());
        return tokenRepository.save(token);
    }
}
