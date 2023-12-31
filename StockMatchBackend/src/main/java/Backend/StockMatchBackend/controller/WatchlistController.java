package Backend.StockMatchBackend.controller;

import Backend.StockMatchBackend.model.StockTable;
import Backend.StockMatchBackend.model.Watchlist;
import Backend.StockMatchBackend.repository.WatchlistRepository;
import Backend.StockMatchBackend.services.WatchlistService;
import Backend.StockMatchBackend.services.dto.WatchListDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@RestController
@RequestMapping("/api/watchlists")
public class WatchlistController {

    @Autowired
    private WatchlistRepository watchlistRepository;
    @Autowired
    private WatchlistService watchlistService;

    @GetMapping("/{id}")
    public Watchlist getWatchlistById(@PathVariable UUID id) {
        return watchlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Watchlist not found"));
    }

    @PostMapping
    public Watchlist createWatchlist(@RequestBody Watchlist watchlist) {
        return watchlistRepository.save(watchlist);
    }

    @GetMapping("/getWatchList")
    public ResponseEntity<List<StockTable>> getWatchlist(@RequestParam String subId) {
        List<StockTable> watchlist = watchlistService.getWatchlistByUserSubId(subId);
        //System.out.println(watchlist);
        return ResponseEntity.ok(watchlist);
    }

    @PostMapping("/addStockToWatchList")
    public ResponseEntity<?> addToWatchlist(@RequestBody WatchListDTO watchlistDTO) {
        watchlistService.addToWatchlist(watchlistDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Added to watchlist");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/removeFromWatchList")
    public ResponseEntity<?> removeFromWatchlist(@RequestBody WatchListDTO watchListDTO) {
        watchlistService.removeFromWatchlist(watchListDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Removed from watchlist");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
