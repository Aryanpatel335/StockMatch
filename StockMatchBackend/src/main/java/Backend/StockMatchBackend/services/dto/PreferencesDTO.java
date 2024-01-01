package Backend.StockMatchBackend.services.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PreferencesDTO {
    private String subID;
    private Double beta;
    private Double analystScore;
    private Double timeInMarket;
    private Double marketCapMillions;
    private String industry;
    private List<String> industryList;
}
