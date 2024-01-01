package Backend.StockMatchBackend.repository;

import Backend.StockMatchBackend.model.StockCandle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;


@Repository
public interface StockCandleRepository extends JpaRepository<StockCandle, UUID> {
    boolean existsByTicker(String ticker);
    List<StockCandle> findByTicker(String ticker);
    @Transactional
    void deleteByTicker(String ticker);
}
