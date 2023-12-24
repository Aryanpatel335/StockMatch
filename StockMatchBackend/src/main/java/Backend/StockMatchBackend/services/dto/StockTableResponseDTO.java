package Backend.StockMatchBackend.services.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockTableResponseDTO {
    private UUID id;
    private String symbol;
    private Float prevDayClose;
    private String country;
    private String currency;
    private String exchange;
    // Note: Consider converting the IPO date into a proper date object
    private String ipo;
    private BigDecimal marketCapitalization;
    private String name;
    private String ticker;
    private String webUrl;
    private String logo;
    private String finnhubIndustry;
    private BigDecimal weekHigh;
    private BigDecimal weekLow;
    // Note: Consider converting the weekLowDate into a proper date object
    private String weekLowDate;
    private BigDecimal beta;
    private String marketLink1;
    private String marketLink2;
    private String marketLink3;
    private String riskLevel;
    private Integer yearsInMarket;

    // Exclude relationships like 'watchlist' and 'stockCandles' if they are not needed in the DTO
    // If they are needed, consider adding a list of DTOs for these entities as well
}
