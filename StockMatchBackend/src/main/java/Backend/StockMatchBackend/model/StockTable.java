package Backend.StockMatchBackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @Column(unique = true)
    private String symbol;
    private String name;
    private Double marketCapitalization;
    private String ipo; // Assuming this is a string representation, e.g., a date
    private Double beta;
    private Double fiftyTwoWeekHigh;
    private Double fiftyTwoWeekLow;
    private Double previousDayClosePrice;
    private String marketLink1;
    private String marketLink2;
    private String webUrl;
    private Double prevDayClose;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Watchlist> watchlist;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<StockCandle> stockCandles;
}
