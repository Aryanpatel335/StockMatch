package Backend.StockMatchBackend.controller;

import Backend.StockMatchBackend.model.Preferences;
import Backend.StockMatchBackend.repository.PreferencesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;


@RestController
@RequestMapping("/preferences")
public class PreferencesController {

    @Autowired
    private PreferencesRepository preferencesRepository;

    @GetMapping("/{id}")
    public Preferences getPreferencesById(@PathVariable UUID id) {
        return preferencesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Preferences not found"));
    }

    @PostMapping
    public Preferences createPreferences(@RequestBody Preferences preferences) {
        return preferencesRepository.save(preferences);
    }

    // Additional CRUD operations (update, delete) can be added here
}
