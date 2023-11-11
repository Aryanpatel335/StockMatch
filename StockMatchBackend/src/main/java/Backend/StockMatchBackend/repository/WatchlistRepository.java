package Backend.StockMatchBackend.repository;


import Backend.StockMatchBackend.model.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist, UUID> {
    // Custom database queries can be added here
}
