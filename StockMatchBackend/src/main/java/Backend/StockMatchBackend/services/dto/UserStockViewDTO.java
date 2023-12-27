package Backend.StockMatchBackend.services.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserStockViewDTO {
    private Integer currentStockView;
    public UserStockViewDTO(Integer currentStockView) {
        this.currentStockView = currentStockView;
    }
}
