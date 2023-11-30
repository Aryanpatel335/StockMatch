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
@Table(name = "preferences")
public class Preferences {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    private Double beta;
    private Double analystScore;
    private Double timeInMarket; // Assuming this is a numeric value representing years
    private Double marketCapMillions;
    private String industry;
    private String riskLevel;
}
