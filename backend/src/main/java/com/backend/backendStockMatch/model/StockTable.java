package com.backend.backendStockMatch.model;

import lombok.*;
import javax.persistence.*;
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
    private UUID id;

    private String symbol;
    private String name;
    private double marketCapitalization;
    private String ipo; // Assuming this is a string representation, e.g., a date
    private double beta;
    private double fiftyTwoWeekHigh;
    private double fiftyTwoWeekLow;
    private double previousDayClosePrice;
    private String marketLink1;
    private String marketLink2;
    private String webUrl;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    private Set<Watchlist> watchlists;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    private Set<StockCandle> stockCandles;
}
