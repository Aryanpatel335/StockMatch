package Backend.StockMatchBackend.repository;

import Backend.StockMatchBackend.model.CompanyNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CompanyNewsRepository extends JpaRepository<CompanyNews, UUID> {
    void deleteByTicker(String ticker);
    List<CompanyNews> findByTicker(String ticker);
}


