package com.backend.backendStockMatch.model;

import lombok.*;
import javax.persistence.*;
import java.util.UUID;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stock_candles")
public class StockCandle {
    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "stock_id")
    private StockTable stock;

    private String ticker;
    private Instant timestamp;
    private double open;
    private double high;
    private double low;
    private double close;
    private Instant uniqueCandleTimestamp;
}
