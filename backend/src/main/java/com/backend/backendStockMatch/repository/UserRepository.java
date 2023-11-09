package com.backend.backendStockMatch.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backendStockMatch.model.User;

import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
}
