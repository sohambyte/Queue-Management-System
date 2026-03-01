package com.qmaster.qms.controller;

import com.qmaster.qms.model.Token;
import com.qmaster.qms.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tokens")
@CrossOrigin(origins = "*")
public class TokenController {

    @Autowired
    private TokenService tokenService;

    @PostMapping("/generate")
    public ResponseEntity<Token> generate(@RequestBody Map<String, Object> payload) {
        try {
            Token token = tokenService.generateToken(
                Long.valueOf(payload.get("serviceId").toString()),
                (String) payload.get("name"),
                (String) payload.get("phone")
            );
            return new ResponseEntity<>(token, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/active")
    public ResponseEntity<List<Token>> getActive() {
        return ResponseEntity.ok(tokenService.getActiveTokens());
    }

    @PostMapping("/call-next/{counterId}")
    public ResponseEntity<Token> callNext(@PathVariable Long counterId) {
        try {
            Token token = tokenService.callNext(counterId);
            return ResponseEntity.ok(token);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<Token> complete(@PathVariable Long id) {
        try {
            Token token = tokenService.completeToken(id);
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}