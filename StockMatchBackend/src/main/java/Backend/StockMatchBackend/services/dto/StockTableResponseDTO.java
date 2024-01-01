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
    private String ipo;
    private BigDecimal marketCapitalization;
    private String name;
    private String ticker;
    private String webUrl;
    private String logo;
    private String finnhubIndustry;
    private BigDecimal weekHigh;
    private BigDecimal weekLow;
    private String weekLowDate;
    private BigDecimal beta;
    private String marketLink1;
    private String marketLink2;
    private String marketLink3;
    private String riskLevel;
    private Integer yearsInMarket;
}
