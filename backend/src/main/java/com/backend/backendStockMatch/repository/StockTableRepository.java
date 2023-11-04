package com.backend.backendStockMatch.repository;

import com.backend.backendStockMatch.model.StockTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StockTableRepository extends JpaRepository<StockTable, UUID> {
}
