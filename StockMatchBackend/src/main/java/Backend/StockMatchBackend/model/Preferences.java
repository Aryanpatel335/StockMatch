package Backend.StockMatchBackend.model;

import Backend.StockMatchBackend.converter.IndustryListJsonConverter;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import javax.persistence.*;
import java.util.List;
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
    private Double timeInMarket;
    private Double marketCapMillions;
    private String industry;
    private String riskLevel;


    @Convert(converter = IndustryListJsonConverter.class)
    private List<String> industryList;


    public Preferences(Preferences original) {

        this.beta = original.getBeta();
        this.analystScore = original.getAnalystScore();
        this.timeInMarket = original.getTimeInMarket();
        this.marketCapMillions = original.getMarketCapMillions();
        this.industry = original.getIndustry();
        this.riskLevel = original.getRiskLevel();
        this.industryList = original.getIndustryList();
        // Note: User is not copied as it's a reference to another entity
    }

}
