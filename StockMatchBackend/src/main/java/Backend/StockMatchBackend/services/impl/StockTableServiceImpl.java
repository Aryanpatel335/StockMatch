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
    private StockTableRepository stockTableRepository;

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Autowired
    private UserRepository userRepository;

    public StockTable addStockInfo(StockTableDTO stockTableDTO) {
        StockTable stockTable = stockTableRepository.findBySymbol(stockTableDTO.getSymbol())
                .orElse(new StockTable());

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
            return "unknown";
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
            return null;
        }

        LocalDate ipoDate;
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            ipoDate = LocalDate.parse(ipoDateString, formatter);
        } catch (DateTimeParseException e) {
            return null;
        }

        LocalDate currentDate = LocalDate.now();
        Period period = Period.between(ipoDate, currentDate);
        return period.getYears();
    }

    public Page<StockTable> getRecommendedStocks(Preferences preferences, Pageable pageable) {
        List<StockTable> allStocks = stockTableRepository.findAll();


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
        return stock.getFinnhubIndustry().equals(preferences.getIndustry()) ? 0 : 1;
    }

    public Page<StockTable> getFilteredStocks(Preferences preferences, Set<UUID> alreadyRecommended , Pageable pageable, int iter) {
        Specification<StockTable> spec = Specification.where(null);
        Specification<StockTable> marketCapSpec = StockTableSpecifications.buildMarketCapSpecification(preferences.getMarketCapMillions());
        Specification<StockTable> timeInMarketSpec = StockTableSpecifications.buildTimeInMarketSpecification(preferences.getTimeInMarket());
        switch (iter){
            case 1:
                //spec = spec.and(StockTableSpecifications.hasMinimumTimeInMarket(preferences.getTimeInMarket()));
                //spec = spec.and(StockTableSpecifications.hasMinimumMarketCap(preferences.getMarketCapMillions()));
                spec = spec.and(marketCapSpec);
                spec = spec.and(timeInMarketSpec);
                spec = spec.and(StockTableSpecifications.hasRiskLevel(preferences.getRiskLevel()));
                spec = spec.and(StockTableSpecifications.hasIndustryList(preferences.getIndustryList()));
                break;
            case 2:
                spec = spec.and(marketCapSpec);
                spec = spec.and(StockTableSpecifications.hasIndustryList(preferences.getIndustryList()));
                spec = spec.and(StockTableSpecifications.hasRiskLevel(preferences.getRiskLevel()));
                break;
            case 3:
                spec = spec.and(StockTableSpecifications.hasIndustryList(preferences.getIndustryList()));
                spec = spec.and(StockTableSpecifications.hasRiskLevel(preferences.getRiskLevel()));
                break;
            case 4:
                spec = spec.and(StockTableSpecifications.hasIndustryList(preferences.getIndustryList()));
                break;
            case 5:
                // case 1 without industry list
                spec = spec.and(marketCapSpec);
                spec = spec.and(timeInMarketSpec);
                spec = spec.and(StockTableSpecifications.hasRiskLevel(preferences.getRiskLevel()));
                break;
            case 6:
                // case 2 without industry list
                spec = spec.and(marketCapSpec);
                spec = spec.and(StockTableSpecifications.hasRiskLevel(preferences.getRiskLevel()));
                break;
            default:
                // case 3 without industry list
                spec = spec.and(StockTableSpecifications.hasRiskLevel(preferences.getRiskLevel()));
                break;
        }

        spec = spec.and(StockTableSpecifications.notInStockIds(alreadyRecommended));

        return stockTableRepository.findAll(spec, pageable);
    }

    public Page<StockTable> getFilteredStocksIteratively(Preferences preferences, Set<UUID> alreadyInWatchList, Pageable pageable) {
        // this is older where we remove the already in watchlist
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

            Collections.shuffle(pageContent);
            allRecommendations.addAll(pageContent);

            //CHANGED
            //accumulatedRecommendations.addAll(page.getContent().stream().map(StockTable::getId).collect(Collectors.toSet()));
            totalPages += page.getTotalPages();

            if(iter==7){
                break;
            }
            iter++;
        }

        return new PageImpl<>(allRecommendations, pageable, totalPages);
    }


//=======================================================================================================
    public Set<UUID> getWatchlistStockIds(String subId) {
        Optional<User> userOptional = userRepository.findBySubID(subId);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();

        List<Watchlist> watchlistEntries = watchlistRepository.findByUser(user);
        return watchlistEntries.stream()
                .map(Watchlist::getStock)
                .map(StockTable::getId)
                .collect(Collectors.toSet());
    }

}
