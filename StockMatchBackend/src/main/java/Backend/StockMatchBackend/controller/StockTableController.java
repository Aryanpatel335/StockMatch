package Backend.StockMatchBackend.controller;

import Backend.StockMatchBackend.model.StockTable;
import Backend.StockMatchBackend.repository.StockTableRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/stocks")
public class StockTableController {

    @Autowired
    private StockTableRepository stockTableRepository;

//    @Autowired
//    private ObjectMapper objectMapper;

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
    public ResponseEntity<String> receiveQuote(@RequestBody StockTable stockInput) {
        Optional<StockTable> existingStock = stockTableRepository.findBySymbol(stockInput.getSymbol());
        if (existingStock.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Symbol already exists in the database.");
        }

        StockTable stockTable = new StockTable();
        stockTable.setSymbol(stockInput.getSymbol());
        stockTable.setPrevDayClose(stockInput.getPrevDayClose());

        stockTable.setName(null);
        stockTable.setMarketCapitalization(null);
        stockTable.setIpo(null);
        stockTable.setBeta(null);
        stockTable.setFiftyTwoWeekHigh(null);
        stockTable.setFiftyTwoWeekLow(null);
        stockTable.setPreviousDayClosePrice(null);
        stockTable.setMarketLink1(null);
        stockTable.setMarketLink2(null);
        stockTable.setWebUrl(null);

        stockTableRepository.save(stockTable);

        return ResponseEntity.ok("Stock saved successfully");

    }
}
