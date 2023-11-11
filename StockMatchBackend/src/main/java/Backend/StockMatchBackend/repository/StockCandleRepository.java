package Backend.StockMatchBackend.repository;

import Backend.StockMatchBackend.model.StockCandle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;


@Repository
public interface StockCandleRepository extends JpaRepository<StockCandle, UUID> {
    // Custom database queries can be added here
}
