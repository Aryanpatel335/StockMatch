package Backend.StockMatchBackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stocks")
public class StockTable {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @Column(unique = true)
    private String symbol;
    private Float prevDayClose;
    private String country;
    private String currency;
    private String exchange;
    private String ipo; // Assuming this is a date in String format
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
    //calculated for preferences;
    private String riskLevel;
    private Integer yearsInMarket;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Watchlist> watchlist;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<StockCandle> stockCandles;
}
