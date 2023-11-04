package com.backend.backendStockMatch.repository;

import com.backend.backendStockMatch.model.StockCandle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StockCandleRepository extends JpaRepository<StockCandle, UUID> {
}
