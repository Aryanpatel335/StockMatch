package Backend.StockMatchBackend.services.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyNewsDTO {
    private String ticker;
    private String category;
    private Instant datetime; // Or use String and then convert it manually
    private String headline;
    private int id;
    private String image;
    private String related;
    private String source;
    private String summary;
    private String url;
}
