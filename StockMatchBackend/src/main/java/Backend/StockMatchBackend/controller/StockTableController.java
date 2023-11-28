package Backend.StockMatchBackend.controller;

import Backend.StockMatchBackend.model.StockTable;
import Backend.StockMatchBackend.repository.StockTableRepository;
import Backend.StockMatchBackend.services.dto.StockTableDTO;
import Backend.StockMatchBackend.services.impl.StockTableServiceImpl;
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
    @Autowired
    private StockTableServiceImpl stockTableService;

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

    @PostMapping("/addStock")
    public ResponseEntity<StockTable> addStockInfo(@RequestBody StockTableDTO stockTableDTO) {
        StockTable stockTable = stockTableService.addStockInfo(stockTableDTO);
        return ResponseEntity.ok(stockTable);
    }

}
