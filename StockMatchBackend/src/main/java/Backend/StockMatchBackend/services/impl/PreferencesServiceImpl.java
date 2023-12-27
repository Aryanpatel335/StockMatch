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

//    @Override
//    public void saveUserPreferences(PreferencesDTO preferencesDTO) {
//        Optional<User> userOptional = userRepository.findBySubID(preferencesDTO.getSubID());
//        if (!userOptional.isPresent()) {
//            throw new RuntimeException("User not found"); // Replace with appropriate exception handling
//        }
//        User user = userOptional.get();
//
//        // Check if preferences for this user already exist
//        Optional<Preferences> existingPreferences = preferencesRepository.findByUser(user);
//        Preferences preferences = existingPreferences.orElse(new Preferences());
//
//        // Set or update the preferences fields
//        preferences.setUser(user);
//        Double beta = preferencesDTO.getBeta();
//        preferences.setBeta(preferencesDTO.getBeta());
//        preferences.setAnalystScore(preferencesDTO.getAnalystScore());
//        preferences.setTimeInMarket(preferencesDTO.getTimeInMarket());
//        preferences.setMarketCapMillions(preferencesDTO.getMarketCapMillions());
//        preferences.setIndustry(preferencesDTO.getIndustry());
//        preferences.setRiskLevel((categorizeRiskLevel(beta)));
//        // Save or update the preferences in the database
//        preferencesRepository.save(preferences);
//    }
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
        preferences.setMarketCapMillions(preferencesDTO.getMarketCapMillions());
        preferences.setIndustryList(preferencesDTO.getIndustryList()); // Set the industry list
        preferences.setRiskLevel(categorizeRiskLevel(preferencesDTO.getBeta()));

        // Save or update the preferences in the database
        preferencesRepository.save(preferences);
    }


    private String categorizeRiskLevel(Double beta) {
        if (beta == null) {
            return "unknown"; // or handle null as you see fit
        }
        if (beta < 1.0) {
            return "low";
        } else if (beta <= 1.5) {
            return "medium";
        } else {
            return "high";
        }
    }


}
