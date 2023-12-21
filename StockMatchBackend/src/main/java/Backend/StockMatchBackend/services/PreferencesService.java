package Backend.StockMatchBackend.services;

import Backend.StockMatchBackend.services.dto.PreferencesDTO;

public interface PreferencesService {
    void saveUserPreferences(PreferencesDTO preferencesDTO);
}
