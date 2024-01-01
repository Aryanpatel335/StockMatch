package Backend.StockMatchBackend.services.specifications;

import Backend.StockMatchBackend.model.StockTable;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
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
        return (root, query, criteriaBuilder) -> {
            if ("unknown".equals(riskLevel)) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("riskLevel"), riskLevel);
        };
    }

    public static Specification<StockTable> notInStockIds(Set<UUID> excludedStockIds) {
        return (root, query, criteriaBuilder) ->
                excludedStockIds.isEmpty() ?
                        criteriaBuilder.conjunction() :
                        root.get("id").in(excludedStockIds).not();
    }

    // Specification for small cap stocks
    public static Specification<StockTable> isSmallCap() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThan(root.get("marketCapitalization"), 2000);
    }

    // Specification for medium cap stocks
    public static Specification<StockTable> isMediumCap() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.between(root.get("marketCapitalization"), 2000, 10000);
    }

    // Specification for large cap stocks
    public static Specification<StockTable> isLargeCap() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("marketCapitalization"), 10000);
    }

    public static Specification<StockTable> hasTimeInMarketLessThan(Double years) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThan(root.get("yearsInMarket"), years);
    }

    public static Specification<StockTable> hasTimeInMarketAtLeast(Double years) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("yearsInMarket"), years);
    }

    public static Specification<StockTable> buildTimeInMarketSpecification(Double threshold) {
        if (threshold == null) {
            return StockTableSpecifications.hasTimeInMarketAtLeast(0.0);
        }

        if (threshold < 10) {
            return StockTableSpecifications.hasTimeInMarketLessThan(10.0);
        } else {
            return StockTableSpecifications.hasTimeInMarketAtLeast(threshold);
        }
    }

    public static Specification<StockTable> buildMarketCapSpecification(Double marketCap) {
        if (marketCap == null) {
            return (root, query, criteriaBuilder) -> criteriaBuilder.isTrue(criteriaBuilder.literal(true));
        }
        if (marketCap < 2000) {
            return isSmallCap();
        } else if (marketCap < 10000) {
            return isMediumCap();
        } else {
            return isLargeCap();
        }
    }


    public static Specification<StockTable> hasIndustryList(List<String> industries) {
        return (root, query, cb) -> {
            if (industries == null || industries.isEmpty()) {
                return cb.isTrue(cb.literal(true)); // If no industry list is provided, return all
            }

            List<Predicate> predicates = new ArrayList<>();
            for (String industry : industries) {
                predicates.add(cb.equal(root.get("finnhubIndustry"), industry));
            }

            Predicate combinedPredicate = cb.or(predicates.toArray(new Predicate[0]));

            return combinedPredicate;
        };
    }

}