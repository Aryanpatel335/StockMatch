package Backend.StockMatchBackend.model;

import lombok.*;
import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "watchlists")
public class Watchlist {
    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Assuming there is a separate entity for Stock
    @ManyToOne
    @JoinColumn(name = "stock_id")
    private StockTable stock;
}
