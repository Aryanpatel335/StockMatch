package com.backend.backendStockMatch.repository;

import com.backend.backendStockMatch.model.Watchlist;
import com.fasterxml.jackson.databind.ser.std.UUIDSerializer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WatchListRepository extends JpaRepository<Watchlist, UUID> {
}
