package Backend.StockMatchBackend.services.impl;

import Backend.StockMatchBackend.model.Preferences;
import Backend.StockMatchBackend.model.StockTable;
import Backend.StockMatchBackend.repository.StockTableRepository;
import Backend.StockMatchBackend.services.StockTableService;
import Backend.StockMatchBackend.services.dto.StockTableDTO;
import Backend.StockMatchBackend.services.specifications.StockTableSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.Period;
import java.time.format.DateTimeParseException;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockTableServiceImpl implements StockTableService {
    @Autowired
    private StockTableRepository stockTableRepository; // Assuming you have a repository

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

    public Page<StockTable> getFilteredStocks(Preferences preferences, Pageable pageable) {
        Specification<StockTable> spec = Specification.where(null);

        if (preferences.getTimeInMarket() != null) {
            spec = spec.and(StockTableSpecifications.hasMinimumTimeInMarket(preferences.getTimeInMarket()));
        }
        if (preferences.getMarketCapMillions() != null) {
            spec = spec.and(StockTableSpecifications.hasMinimumMarketCap(preferences.getMarketCapMillions()));
        }
        if (preferences.getIndustry() != null) {
            spec = spec.and(StockTableSpecifications.hasIndustry(preferences.getIndustry()));
        }
        if (preferences.getRiskLevel() != null) {
            spec = spec.and(StockTableSpecifications.hasRiskLevel(preferences.getRiskLevel()));
        }


        return stockTableRepository.findAll(spec, pageable);
    }

}
