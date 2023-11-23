package Backend.StockMatchBackend.controller;

import Backend.StockMatchBackend.model.Watchlist;
import Backend.StockMatchBackend.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;


@RestController
@RequestMapping("/watchlists")
public class WatchlistController {

    @Autowired
    private WatchlistRepository watchlistRepository;

    @GetMapping("/{id}")
    public Watchlist getWatchlistById(@PathVariable UUID id) {
        return watchlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Watchlist not found"));
    }

    @PostMapping
    public Watchlist createWatchlist(@RequestBody Watchlist watchlist) {
        return watchlistRepository.save(watchlist);
    }

    // Additional CRUD operations (update, delete) can be added here
}
