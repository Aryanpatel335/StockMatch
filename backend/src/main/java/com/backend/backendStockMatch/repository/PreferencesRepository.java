package com.backend.backendStockMatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import com.backend.backendStockMatch.model.Preferences;

@Repository
public interface PreferencesRepository extends JpaRepository<Preferences, UUID> {
    // Custom database queries can be added here
}
