package Backend.StockMatchBackend.services.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WatchListDTO {
    private String subID;
    private String ticker;
    private String action;
}
