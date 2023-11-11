package Backend.StockMatchBackend.model;

import lombok.*;
import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "preferences")
public class Preferences {
    @Id
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private double beta;
    private double analystScore;
    private double timeInMarket; // Assuming this is a numeric value representing years
}
