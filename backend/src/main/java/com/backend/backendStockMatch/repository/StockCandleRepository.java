package com.backend.backendStockMatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backendStockMatch.model.StockCandle;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StockCandleRepository extends JpaRepository<StockCandle, UUID> {
}