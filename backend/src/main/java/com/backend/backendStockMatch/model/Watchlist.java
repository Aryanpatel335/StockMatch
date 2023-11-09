package com.backend.backendStockMatch.model;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.io.Serializable;
import java.util.Set;
import java.util.UUID;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "watchlists")
public class Watchlist {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id") // This should be the name of the foreign key column in the 'watchlists' table.
    @JsonBackReference("user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "stock_id", referencedColumnName = "id")
    @JsonBackReference("stock")
    private StockTable stock;
}