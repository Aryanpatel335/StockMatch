package Backend.StockMatchBackend.repository;


import Backend.StockMatchBackend.model.StockTable;
import Backend.StockMatchBackend.model.User;
import Backend.StockMatchBackend.model.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist, UUID> {
    // Custom database queries can be added here
    Optional<Watchlist> findByUserAndStock(User user, StockTable stock);
    List<Watchlist> findByUser(User user);
}
