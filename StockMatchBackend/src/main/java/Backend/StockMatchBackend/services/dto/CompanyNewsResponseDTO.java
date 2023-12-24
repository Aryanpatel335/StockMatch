package Backend.StockMatchBackend.services.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
public class CompanyNewsResponseDTO {
    private UUID id;
    private String ticker;
    private String category;
    private String headline;
    private String imageUrl;
    private String source;
    private String summary;
    private String newsUrl;
    private String related;
    private Instant datetime;

    // Getters and setters
    // Add constructors if needed
}
