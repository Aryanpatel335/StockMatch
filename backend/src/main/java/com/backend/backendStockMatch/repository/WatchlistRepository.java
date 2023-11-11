package com.backend.backendStockMatch.repository;

import com.backend.backendStockMatch.model.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist, UUID> {
    // Custom database queries can be added here
}
