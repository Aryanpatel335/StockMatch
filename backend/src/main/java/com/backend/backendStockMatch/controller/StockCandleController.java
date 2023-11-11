package com.backend.backendStockMatch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import com.backend.backendStockMatch.model.StockCandle;
import com.backend.backendStockMatch.repository.StockCandleRepository;

@RestController
@RequestMapping("/stockCandles")
public class StockCandleController {

    @Autowired
    private StockCandleRepository stockCandleRepository;

    @GetMapping("/{id}")
    public StockCandle getStockCandleById(@PathVariable UUID id) {
        return stockCandleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock Candle not found"));
    }

    @PostMapping
    public StockCandle createStockCandle(@RequestBody StockCandle stockCandle) {
        return stockCandleRepository.save(stockCandle);
    }

    // Additional CRUD operations (update, delete) can be added here
}
