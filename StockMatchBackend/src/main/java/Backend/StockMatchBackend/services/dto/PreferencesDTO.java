package Backend.StockMatchBackend.services.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PreferencesDTO {
    private String subID; // Use the identifier received from the frontend
    private Double beta;
    private Double analystScore;
    private Double timeInMarket;
    private Double marketCapMillions;
    private String industry;
    private List<String> industryList;
    // Getters and setters
}
