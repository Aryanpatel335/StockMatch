package Backend.StockMatchBackend.services.dto;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class StockCandleDTO {
    private String ticker;
    private List<BigDecimal> c; // Close prices
    private List<BigDecimal> h; // High prices
    private List<BigDecimal> l; // Low prices
    private List<BigDecimal> o; // Open prices
    private List<Long> t; // Timestamps
    private List<Long> v; // Volumes

    // Getters and setters we using Lombok
}