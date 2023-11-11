package com.backend.backendStockMatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import com.backend.backendStockMatch.model.StockTable;

@Repository
public interface StockTableRepository extends JpaRepository<StockTable, UUID> {
    // Custom database queries can be added here
}
