package com.backend.backendStockMatch.model;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Set;
import java.util.UUID;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "StockCandle",  schema = "public")
public class StockCandle {
    @Id
    @GeneratedValue
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
    private double volume;
    private Instant uniqueCandleTimestamp;

    // This table should be dropped and recreated on each update
    // For performance, consider batch operations or direct SQL for large datasets
}