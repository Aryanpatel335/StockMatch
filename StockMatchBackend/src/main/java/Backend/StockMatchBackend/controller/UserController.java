package Backend.StockMatchBackend.controller;

import Backend.StockMatchBackend.model.Preferences;
import Backend.StockMatchBackend.model.StockTable;
import Backend.StockMatchBackend.model.User;
import Backend.StockMatchBackend.repository.StockTableRepository;
import Backend.StockMatchBackend.repository.UserRepository;
import Backend.StockMatchBackend.services.dto.UserDTO;
import Backend.StockMatchBackend.services.impl.StockTableServiceImpl;
import Backend.StockMatchBackend.services.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private StockTableServiceImpl stockTableImpl;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    //testing purpose only we wont use this here
//    @PostMapping
//    public User createUser(@RequestBody User user) {
//        return userRepository.save(user);
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        User user = userService.processUserLogin(userDTO);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/preferences/{subId}")
    public ResponseEntity<Preferences> getUserPreferences(@PathVariable String subId) {
        try {
            Preferences preferences = userService.getUserPreferences(subId);
            return ResponseEntity.ok(preferences);
        } catch (RuntimeException e) {
            // Handle exceptions, e.g., user not found or preferences not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/{subID}/stocks/recommendations")
    public ResponseEntity<Page<StockTable>> getStockRecommendations(@PathVariable String subID,
                                                                    @RequestParam(defaultValue = "0") int page,
                                                                    @RequestParam(defaultValue = "30") int size) {
        Preferences preferences = userService.getUserPreferences(subID);
        if (preferences == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Set<UUID> alreadyInWatchList = stockTableImpl.getWatchlistStockIds(subID);
        // Create Pageable object
        Pageable pageable = PageRequest.of(page, size);

        // Fetch filtered stocks based on preferences
        Page<StockTable> recommendedStocks = stockTableImpl.getFilteredStocksIteratively(preferences, alreadyInWatchList, pageable);

        return ResponseEntity.ok(recommendedStocks);
    }

    @PostMapping("/{subID}/userStockView")
    public ResponseEntity<?> setUserStockView(@PathVariable String subID, @RequestParam(defaultValue = "0") Integer lastStockView){
        Optional<User> userOptional = userRepository.findBySubID(subID);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setCurrentStockView(lastStockView);
            userRepository.save(user);
            return ResponseEntity.ok().build(); // Successfully updated
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @GetMapping("/{subID}/userStockView")
    public ResponseEntity<?> getUserStockView(@PathVariable String subID) {
        Optional<User> userOptional = userRepository.findBySubID(subID);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Integer currentStockView = user.getCurrentStockView();
            return ResponseEntity.ok(currentStockView); // Return the current stock view
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }



}
