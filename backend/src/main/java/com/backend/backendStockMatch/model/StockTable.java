package com.backend.backendStockMatch.model;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import javax.persistence.*;
import java.util.Set;
import java.util.UUID;
import java.time.Instant;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stock_table")
public class StockTable {
    @Id
    @GeneratedValue
    private UUID id;
    private String symbol;
    private String name;
    private double marketCapitalization;
    // ... other fields

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    private Set<Watchlist> watchlists;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    private Set<StockCandle> stockCandles;
}
