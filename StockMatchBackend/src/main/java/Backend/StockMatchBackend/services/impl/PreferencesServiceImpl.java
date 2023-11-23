package Backend.StockMatchBackend.services.impl;

import Backend.StockMatchBackend.model.Preferences;
import Backend.StockMatchBackend.model.User;
import Backend.StockMatchBackend.repository.PreferencesRepository;
import Backend.StockMatchBackend.repository.UserRepository;
import Backend.StockMatchBackend.services.PreferencesService;
import Backend.StockMatchBackend.services.dto.PreferencesDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PreferencesServiceImpl implements PreferencesService {
    private static final java.util.UUID UUID= java.util.UUID.randomUUID();
    @Autowired
    private PreferencesRepository preferencesRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void saveUserPreferences(PreferencesDTO preferencesDTO) {
        Optional<User> userOptional = userRepository.findBySubID(preferencesDTO.getSubID());
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found"); // Replace with appropriate exception handling
        }
        User user = userOptional.get();

        // Check if preferences for this user already exist
        Optional<Preferences> existingPreferences = preferencesRepository.findByUser(user);
        Preferences preferences = existingPreferences.orElse(new Preferences());

        // Set or update the preferences fields
        preferences.setUser(user);
        preferences.setBeta(preferencesDTO.getBeta());
        preferences.setAnalystScore(preferencesDTO.getAnalystScore());
        preferences.setTimeInMarket(preferencesDTO.getTimeInMarket());

        // Save or update the preferences in the database
        preferencesRepository.save(preferences);
    }


}
