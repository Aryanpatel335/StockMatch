package Backend.StockMatchBackend.services.specifications;

import Backend.StockMatchBackend.model.StockTable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Set;
import java.util.UUID;

public class StockTableSpecifications {

    public static Specification<StockTable> hasMinimumTimeInMarket(Double timeInMarket) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("yearsInMarket"), timeInMarket);
    }

    public static Specification<StockTable> hasMinimumMarketCap(Double marketCap) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("marketCapitalization"), marketCap);
    }

    public static Specification<StockTable> hasIndustry(String industry) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("finnhubIndustry"), industry);
    }

    public static Specification<StockTable> hasRiskLevel(String riskLevel) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("riskLevel"), riskLevel);
    }

    public static Specification<StockTable> notInStockIds(Set<UUID> excludedStockIds) {
        return (root, query, criteriaBuilder) ->
                excludedStockIds.isEmpty() ?
                        criteriaBuilder.conjunction() :
                        root.get("id").in(excludedStockIds).not();
    }
}