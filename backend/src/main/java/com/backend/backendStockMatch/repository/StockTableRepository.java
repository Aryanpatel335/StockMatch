package com.backend.backendStockMatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backendStockMatch.model.StockTable;
import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StockTableRepository extends JpaRepository<StockTable, UUID> {
}
