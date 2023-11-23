package Backend.StockMatchBackend.controller;

import Backend.StockMatchBackend.model.StockCandle;
import Backend.StockMatchBackend.repository.StockCandleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;


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
