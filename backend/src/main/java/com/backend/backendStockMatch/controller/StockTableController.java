package com.backend.backendStockMatch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import com.backend.backendStockMatch.model.StockTable;
import com.backend.backendStockMatch.repository.StockTableRepository;

@RestController
@RequestMapping("/stocks")
public class StockTableController {

    @Autowired
    private StockTableRepository stockTableRepository;

    @GetMapping("/{id}")
    public StockTable getStockById(@PathVariable UUID id) {
        return stockTableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock not found"));
    }

    @PostMapping
    public StockTable createStock(@RequestBody StockTable stockTable) {
        return stockTableRepository.save(stockTable);
    }

    // Additional CRUD operations (update, delete) can be added here
}
