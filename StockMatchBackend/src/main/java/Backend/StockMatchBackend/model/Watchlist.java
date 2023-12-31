package Backend.StockMatchBackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;


    @ManyToOne
    @JoinColumn(name = "stock_id")
    @JsonBackReference
    private StockTable stock;
}
