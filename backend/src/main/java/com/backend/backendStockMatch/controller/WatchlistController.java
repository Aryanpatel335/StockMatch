package com.backend.backendStockMatch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import com.backend.backendStockMatch.model.Watchlist;
import com.backend.backendStockMatch.repository.WatchlistRepository;

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
