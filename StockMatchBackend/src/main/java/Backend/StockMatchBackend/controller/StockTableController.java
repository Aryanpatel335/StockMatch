package Backend.StockMatchBackend.controller;

import Backend.StockMatchBackend.model.StockTable;
import Backend.StockMatchBackend.repository.StockTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;


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

    @PostMapping("/receiveQuote")
    public ResponseEntity<String> receiveQuote(@RequestBody String quoteJson) {
        // Process the incoming JSON, save it, or do whatever is needed
        System.out.println("Received quote: " + quoteJson);

        // Respond with a success status
        return ResponseEntity.ok("Quote received successfully");
    }
}
