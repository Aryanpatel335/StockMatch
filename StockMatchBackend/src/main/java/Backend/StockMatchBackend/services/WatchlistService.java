package Backend.StockMatchBackend.services;

import Backend.StockMatchBackend.model.StockTable;
import Backend.StockMatchBackend.services.dto.WatchListDTO;

import java.util.List;

public interface WatchlistService {
    void addToWatchlist(WatchListDTO watchlistDTO);
    void removeFromWatchlist(WatchListDTO watchlistDTO);
    void processWatchlistAction(WatchListDTO watchlistDTO);
    List<StockTable> getWatchlistByUserSubId(String subId);
}
