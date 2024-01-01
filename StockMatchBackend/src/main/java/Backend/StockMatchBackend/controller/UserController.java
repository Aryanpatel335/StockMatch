package Backend.StockMatchBackend.controller;

import Backend.StockMatchBackend.model.Preferences;
import Backend.StockMatchBackend.model.StockTable;
import Backend.StockMatchBackend.model.User;
import Backend.StockMatchBackend.repository.PreferencesRepository;
import Backend.StockMatchBackend.repository.UserRepository;
import Backend.StockMatchBackend.services.dto.StockTableResponseDTO;
import Backend.StockMatchBackend.services.dto.UserStockViewDTO;
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

import java.util.*;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private StockTableServiceImpl stockTableImpl;

    @Autowired
    private PreferencesRepository preferencesRepository;


    private UserStockViewDTO userStockViewDTO;

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
    public ResponseEntity<Page<StockTableResponseDTO>> getStockRecommendations(@PathVariable String subID,
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

        Page<StockTableResponseDTO> dtoStockTablePage = recommendedStocks.map(this::mapToStockTableResponseDTO);
        return ResponseEntity.ok(dtoStockTablePage);
    }

//    @PostMapping("/{subID}/userStockView")
//    public ResponseEntity<?> setUserStockView(@PathVariable String subID, @RequestParam(defaultValue = "0") Integer lastStockView){
//        Optional<User> userOptional = userRepository.findBySubID(subID);
//        if (userOptional.isPresent()) {
//            User user = userOptional.get();
//            user.setCurrentStockView(lastStockView);
//            userRepository.save(user);
//            return ResponseEntity.ok().build(); // Successfully updated
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//        }
//    }
    @PostMapping("/{subID}/userStockView")
    public ResponseEntity<?> setUserStockView(@PathVariable String subID, @RequestParam(defaultValue = "0") Integer lastStockView) {
        Optional<User> userOptional = userRepository.findBySubID(subID);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setCurrentStockView(lastStockView);
            userRepository.save(user);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User stock view set successfully");
            return ResponseEntity.ok(response); // Returns a JSON body with the message
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
            UserStockViewDTO response = new UserStockViewDTO(currentStockView);
            return ResponseEntity.ok(response); // Return the response as JSON
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @GetMapping("/{subID}")
    public ResponseEntity<?> getUserBySubID(@PathVariable String subID) {
        Optional<User> userOptional = userRepository.findBySubID(subID);

        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @DeleteMapping("/{subID}")
    public ResponseEntity<?> deleteUserBySubID(@PathVariable String subID) {
        // Check if user exists
        Optional<User> userOptional = userRepository.findBySubID(subID);
        if (!userOptional.isPresent()) {
            Map<String, String> responseNotFound = new HashMap<>();
            responseNotFound.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseNotFound);
        }

        // Check for foreign key constraints with Preferences
        List<Preferences> preferences = preferencesRepository.findByUserId(userOptional.get().getId());
        if (!preferences.isEmpty()) {
            // Delete the preferences
            preferencesRepository.deleteAll(preferences);
        }

        userRepository.delete(userOptional.get());

        Map<String, String> responseSuccess = new HashMap<>();
        responseSuccess.put("message", "User with ID " + subID + " and all related preferences successfully deleted");

        return ResponseEntity.ok(responseSuccess);
    }

    public StockTableResponseDTO mapToStockTableResponseDTO(StockTable stockTable) {
        StockTableResponseDTO dto = new StockTableResponseDTO();

        dto.setId(stockTable.getId());
        dto.setSymbol(stockTable.getSymbol());
        dto.setPrevDayClose(stockTable.getPrevDayClose());
        dto.setCountry(stockTable.getCountry());
        dto.setCurrency(stockTable.getCurrency());
        dto.setExchange(stockTable.getExchange());
        dto.setIpo(stockTable.getIpo());
        dto.setMarketCapitalization(stockTable.getMarketCapitalization());
        dto.setName(stockTable.getName());
        dto.setTicker(stockTable.getTicker());
        dto.setWebUrl(stockTable.getWebUrl());
        dto.setLogo(stockTable.getLogo());
        dto.setFinnhubIndustry(stockTable.getFinnhubIndustry());
        dto.setWeekHigh(stockTable.getWeekHigh());
        dto.setWeekLow(stockTable.getWeekLow());
        dto.setWeekLowDate(stockTable.getWeekLowDate());
        dto.setBeta(stockTable.getBeta());
        dto.setMarketLink1(stockTable.getMarketLink1());
        dto.setMarketLink2(stockTable.getMarketLink2());
        dto.setMarketLink3(stockTable.getMarketLink3());
        dto.setRiskLevel(stockTable.getRiskLevel());
        dto.setYearsInMarket(stockTable.getYearsInMarket());


        return dto;
    }




}
