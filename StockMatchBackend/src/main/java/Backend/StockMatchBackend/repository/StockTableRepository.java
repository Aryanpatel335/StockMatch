package Backend.StockMatchBackend.repository;

import Backend.StockMatchBackend.model.StockTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


@Repository
public interface StockTableRepository extends JpaRepository<StockTable, UUID> {
    // Custom database queries can be added here
    Optional<StockTable> findBySymbol(String symbol);
}
