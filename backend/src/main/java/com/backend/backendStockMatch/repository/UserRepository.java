package com.backend.backendStockMatch.repository;

import com.backend.backendStockMatch.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
