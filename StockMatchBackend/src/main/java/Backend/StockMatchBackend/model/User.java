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
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    private String username;
    private String email;

    @Column(unique = true)
    private String subID;

    private Integer currentStockView;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Preferences preferences;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Watchlist> watchlist;
}
