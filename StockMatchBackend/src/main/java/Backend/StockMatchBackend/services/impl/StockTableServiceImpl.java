package Backend.StockMatchBackend.services.impl;

import Backend.StockMatchBackend.model.Preferences;
import Backend.StockMatchBackend.model.StockTable;
import Backend.StockMatchBackend.model.User;
import Backend.StockMatchBackend.model.Watchlist;
import Backend.StockMatchBackend.repository.StockTableRepository;
import Backend.StockMatchBackend.repository.UserRepository;
import Backend.StockMatchBackend.repository.WatchlistRepository;
import Backend.StockMatchBackend.services.StockTableService;
import Backend.StockMatchBackend.services.dto.StockTableDTO;
import Backend.StockMatchBackend.services.specifications.StockTableSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.relational.core.sql.TrueCondition;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.Period;
import java.time.format.DateTimeParseException;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StockTableServiceImpl implements StockTableService {
    @Autowired
    private StockTableRepository stockTableRepository; // Assuming you have a repository

    @Autowired
    private WatchlistRepository watchlistRepository; // Assuming this repository exists

    @Autowired
    private UserRepository userRepository;

    public StockTable addStockInfo(StockTableDTO stockTableDTO) {
        StockTable stockTable = stockTableRepository.findBySymbol(stockTableDTO.getSymbol())
                .orElse(new StockTable());
//        System.out.println(stockTableDTO.getFinnhubIndustry());

        mapDtoToStockInfo(stockTable, stockTableDTO);

        return stockTableRepository.save(stockTable);
    }

    private void mapDtoToStockInfo(StockTable stockTable, StockTableDTO stockTableDTO) {
        stockTable.setSymbol(stockTableDTO.getSymbol());
        stockTable.setPrevDayClose(stockTableDTO.getPrevDayClose());
        stockTable.setCountry(stockTableDTO.getCountry());
        stockTable.setCurrency(stockTableDTO.getCurrency());
        stockTable.setExchange(stockTableDTO.getExchange());
        stockTable.setIpo(stockTableDTO.getIpo());
        stockTable.setMarketCapitalization(stockTableDTO.getMarketCapitalization());
        stockTable.setName(stockTableDTO.getName());
        stockTable.setTicker(stockTableDTO.getTicker());
        stockTable.setWebUrl(stockTableDTO.getWebUrl());
        stockTable.setLogo(stockTableDTO.getLogo());
        stockTable.setFinnhubIndustry(stockTableDTO.getFinnhubIndustry());
        stockTable.setWeekHigh(stockTableDTO.getWeekHigh());
        stockTable.setWeekLow(stockTableDTO.getWeekLow());
        stockTable.setWeekLowDate(stockTableDTO.getWeekLowDate());
        stockTable.setBeta(stockTableDTO.getBeta());
        stockTable.setMarketLink1(stockTableDTO.getMarketLink1());
        stockTable.setMarketLink2(stockTableDTO.getMarketLink2());
        stockTable.setMarketLink3(stockTableDTO.getMarketLink3());
        BigDecimal beta = stockTableDTO.getBeta();
        stockTable.setRiskLevel(categorizeRiskLevel(beta));
        String ipo_string = stockTableDTO.getIpo();
        stockTable.setYearsInMarket(calculateYearsSinceIPO(ipo_string));
    }


    private String categorizeRiskLevel(BigDecimal beta) {
        if (beta == null) {
            return "unknown"; // or handle null as you see fit
        }
        BigDecimal one = new BigDecimal("1.0");
        BigDecimal onePointFive = new BigDecimal("1.5");
        if (beta.compareTo(one) < 0) {
            return "low";
        } else if (beta.compareTo(onePointFive) <= 0) {
            return "medium";
        } else {
            return "high";
        }
    }

    public Integer calculateYearsSinceIPO(String ipoDateString) {
        if (ipoDateString == null || ipoDateString.isEmpty()) {
            return null; // Return null for error or invalid cases
        }

        LocalDate ipoDate;
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            ipoDate = LocalDate.parse(ipoDateString, formatter);
        } catch (DateTimeParseException e) {
            return null; // Return null if parsing fails
        }

        LocalDate currentDate = LocalDate.now();
        Period period = Period.between(ipoDate, currentDate);
        return period.getYears(); // Autoboxing converts int to Integer
    }

    public Page<StockTable> getRecommendedStocks(Preferences preferences, Pageable pageable) {
        List<StockTable> allStocks = stockTableRepository.findAll();

        // Sort stocks based on preferences (this is a simplified example)
        List<StockTable> sortedStocks = allStocks.stream()
                .sorted(Comparator.comparing(stock -> matchScore(stock, preferences)))
                .collect(Collectors.toList());

        int total = sortedStocks.size();
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), total);


        List<StockTable> pageContent = sortedStocks.subList(start, end);

        return new PageImpl<>(pageContent, pageable, total);
    }

    private int matchScore(StockTable stock, Preferences preferences) {
        // Implement your scoring logic here
        // Example: simple scoring based on matching industry
        return stock.getFinnhubIndustry().equals(preferences.getIndustry()) ? 0 : 1;
    }

    public Page<StockTable> getFilteredStocks(Preferences preferences, Set<UUID> alreadyRecommended , Pageable pageable, int iter) {
        Specification<StockTable> spec = Specification.where(null);

        switch (iter){
            case 1:
                spec = spec.and(StockTableSpecifications.hasMinimumTimeInMarket(preferences.getTimeInMarket()));
                spec = spec.and(StockTableSpecifications.hasMinimumMarketCap(preferences.getMarketCapMillions()));
//                spec = spec.and(StockTableSpecifications.hasIndustry(preferences.getIndustry()));
                spec = spec.and(StockTableSpecifications.hasRiskLevel(preferences.getRiskLevel()));
                spec = spec.and(StockTableSpecifications.hasIndustryList(preferences.getIndustryList()));

                break;
            case 2:
                spec = spec.and(StockTableSpecifications.hasMinimumMarketCap(preferences.getMarketCapMillions()));
//                spec = spec.and(StockTableSpecifications.hasIndustry(preferences.getIndustry()));
                spec = spec.and(StockTableSpecifications.hasIndustryList(preferences.getIndustryList()));

                spec = spec.and(StockTableSpecifications.hasRiskLevel(preferences.getRiskLevel()));
                break;
            case 3:
//                spec = spec.and(StockTableSpecifications.hasIndustry(preferences.getIndustry()));
                spec = spec.and(StockTableSpecifications.hasIndustryList(preferences.getIndustryList()));

                spec = spec.and(StockTableSpecifications.hasRiskLevel(preferences.getRiskLevel()));
                break;

            case 4:
//                spec = spec.and(StockTableSpecifications.hasIndustry(preferences.getIndustry()));
                spec = spec.and(StockTableSpecifications.hasIndustryList(preferences.getIndustryList()));

            case 5:
                spec = spec.and(StockTableSpecifications.hasMinimumTimeInMarket(5.0)); // Hardcoded value for time in market
                spec = spec.and(StockTableSpecifications.hasRiskLevel("high")); // Hardcoded value for risk level
                break;
            case 6:
                spec = spec.and(StockTableSpecifications.hasMinimumMarketCap(10000.0)); // Hardcoded value for market cap
                spec = spec.and(StockTableSpecifications.hasIndustryList(Arrays.asList("Technology", "Finance"))); // Hardcoded industry list
                break;
            case 7:
                spec = spec.and(StockTableSpecifications.hasMinimumTimeInMarket(10.0)); // Hardcoded value for time in market
                spec = spec.and(StockTableSpecifications.hasMinimumMarketCap(5000.0)); // Hardcoded value for market cap
                break;
            case 8:
                spec = spec.and(StockTableSpecifications.hasRiskLevel("medium")); // Hardcoded value for risk level
                break;
            case 9:
                spec = spec.and(StockTableSpecifications.hasMinimumTimeInMarket(5.0));; // Hardcoded industry list
                break;
            default:
                spec = spec.and(StockTableSpecifications.hasMinimumTimeInMarket(3.0)); // Hardcoded value for time in market
                spec = spec.and(StockTableSpecifications.hasMinimumMarketCap(1.0)); // Hardcoded value for market cap

                break;


        }
//        if (preferences.getTimeInMarket() != null) {
//            spec = spec.and(StockTableSpecifications.hasMinimumTimeInMarket(preferences.getTimeInMarket()));
//        }
//        if (preferences.getMarketCapMillions() != null) {
//            spec = spec.and(StockTableSpecifications.hasMinimumMarketCap(preferences.getMarketCapMillions()));
//        }
//        if (preferences.getIndustry() != null) {
//            spec = spec.and(StockTableSpecifications.hasIndustry(preferences.getIndustry()));
//        }
//        if (preferences.getRiskLevel() != null) {
//            spec = spec.and(StockTableSpecifications.hasRiskLevel(preferences.getRiskLevel()));
//        }

        spec = spec.and(StockTableSpecifications.notInStockIds(alreadyRecommended));

        return stockTableRepository.findAll(spec, pageable);
    }
//=======================================================================================================
    // Experimental approach to only show recommended stocks etc

    public Page<StockTable> getFilteredStocksIteratively(Preferences preferences, Set<UUID> alreadyInWatchList, Pageable pageable) {
        //this is older where we remove the already in watchlist
        // this was removed to be empty list as per Martin we
        // should also include all stocks whether they are part of watchlist or not.
        //CHANGED
//        Set<UUID> accumulatedRecommendations = new HashSet<>(alreadyInWatchList);
        Set<UUID> accumulatedRecommendations = new HashSet<>();

        List<StockTable> allRecommendations = new ArrayList<>();
        int totalPages = 0;

        Preferences currentPreferences = new Preferences(preferences); // Copy initial preferences
        int iter = 1;
        while (true) {
//            Page<StockTable> page = getFilteredStocks(currentPreferences, accumulatedRecommendations, pageable, iter);
//            allRecommendations.addAll(page.getContent());
            Page<StockTable> page = getFilteredStocks(currentPreferences, accumulatedRecommendations, pageable, iter);
            List<StockTable> pageContent = new ArrayList<>(page.getContent());

            // Shuffle the page content if iter is less than or equal to 4
            if (iter <= 8) {
                Collections.shuffle(pageContent);
            }

            allRecommendations.addAll(pageContent);

            //CHANGED
            //accumulatedRecommendations.addAll(page.getContent().stream().map(StockTable::getId).collect(Collectors.toSet()));
            totalPages += page.getTotalPages();

//            if (iter == 4 ||!shouldRemoveNextSpecification(currentPreferences) || page.getTotalPages() <= pageable.getPageNumber()) {
//                break;
//            }
//            if (iter == 10 ||!shouldRemoveNextSpecification(currentPreferences)) {
//                break;
//            }
            if(iter==10){
                break;
            }
            currentPreferences = removeNextSpecification(currentPreferences, iter);
            iter++;
        }

        return new PageImpl<>(allRecommendations, pageable, totalPages);
    }

    private boolean shouldRemoveNextSpecification(Preferences preferences) {
        // Logic to determine if another specification should be removed
        // Return false if there are no more specifications to remove
        if (preferences.getIndustry() != null){
            return true;
        }
        return false;
    }

    public Preferences removeNextSpecification(Preferences preferences, int iteration) {

        switch (iteration) {
            case 1:
                // Iteration 1: Remove YearsInMarket
                preferences.setTimeInMarket(null);
                break;
            case 2:
                // Iteration 2: Remove MarketCap
                preferences.setMarketCapMillions(null);
                break;
            case 3:
                // Iteration 3: Remove Beta
                preferences.setRiskLevel(null);
                break;

            case 4:
                preferences.setIndustry(null);
                break;
            default:

                break;
        }

        return preferences;
    }


//=======================================================================================================
    public Set<UUID> getWatchlistStockIds(String subId) {
        Optional<User> userOptional = userRepository.findBySubID(subId);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found"); // Or handle this more gracefully
        }

        User user = userOptional.get();

        // Fetch the watchlist entries for the user and extract the stock IDs
        List<Watchlist> watchlistEntries = watchlistRepository.findByUser(user);
        return watchlistEntries.stream()
                .map(Watchlist::getStock)
                .map(StockTable::getId)
                .collect(Collectors.toSet());
    }

}
