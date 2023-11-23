package Backend.StockMatchBackend.services.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PreferencesDTO {
    private String subID; // Use the identifier received from the frontend
    private Double beta;
    private Double analystScore;
    private Double timeInMarket;

    // Getters and setters
}
