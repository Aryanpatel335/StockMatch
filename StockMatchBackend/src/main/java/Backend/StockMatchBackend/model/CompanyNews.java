package Backend.StockMatchBackend.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "company_news")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyNews {

    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;
    @Column(name = "ticker", nullable = false)
    private String ticker;
    private String category;
    private String headline;
    private String imageUrl;
    private String source;
    @Column(name = "summary", length = 5000)
    private String summary;
    private String newsUrl;
    private String related;
    private Instant datetime;
}
