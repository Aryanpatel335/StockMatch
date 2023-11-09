package com.backend.backendStockMatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backendStockMatch.model.Watchlist;
import com.fasterxml.jackson.databind.ser.std.UUIDSerializer;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface WatchListRepository extends JpaRepository<Watchlist, UUID> {
}
