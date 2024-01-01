package Backend.StockMatchBackend.services;

import Backend.StockMatchBackend.model.CompanyNews;
import Backend.StockMatchBackend.services.dto.CompanyNewsResponseDTO;

import java.util.List;

public interface CompanyNewsService {
    CompanyNews saveCompanyNews(CompanyNews companyNews);
    List<CompanyNews> getAllCompanyNews();
    List<CompanyNews> saveAll(List<CompanyNews> companyNewsList);

    void deleteNewsByTicker(String ticker);

    List<CompanyNewsResponseDTO> findByTicker(String ticker);
}
