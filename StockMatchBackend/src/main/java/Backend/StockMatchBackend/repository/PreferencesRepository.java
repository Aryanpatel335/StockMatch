package Backend.StockMatchBackend.repository;

import Backend.StockMatchBackend.model.Preferences;
import Backend.StockMatchBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface PreferencesRepository extends JpaRepository<Preferences, UUID> {
    // Custom database queries can be added here
    Optional<Preferences> findByUser(User user);

    List<Preferences> findByUserId(UUID userID);
}
