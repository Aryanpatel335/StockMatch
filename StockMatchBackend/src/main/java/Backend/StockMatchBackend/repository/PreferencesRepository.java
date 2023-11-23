package Backend.StockMatchBackend.repository;

import Backend.StockMatchBackend.model.Preferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;


@Repository
public interface PreferencesRepository extends JpaRepository<Preferences, UUID> {
    // Custom database queries can be added here
}
