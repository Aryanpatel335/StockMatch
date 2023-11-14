package Backend.StockMatchBackend.controller;

import Backend.StockMatchBackend.model.StockCandle;
import Backend.StockMatchBackend.repository.StockCandleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    //sample (using for testing the string received for json data)
    @PostMapping("/receiveStockQuote")
    public ResponseEntity<String> receiveStockQuote(@RequestBody String stockCandle) {
        // Print the received JSON
        System.out.println("Received stock quote: " + stockCandle);

        // Return a response
        return ResponseEntity.ok("Received stock quote: " + stockCandle);
    }
}
