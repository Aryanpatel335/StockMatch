package com.backend.backendStockMatch.model;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Set;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "StockTable",  schema = "public")
public class StockTable {
    @Id
    @GeneratedValue
    private UUID id;
    private String symbol;
    private String name;
    private double marketCapitalization;
    // ... other fields


    private Set<WatchlistStock> watchlistStocks;


    private Set<StockCandle> stockCandles;
}
