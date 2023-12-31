package Backend.StockMatchBackend.services.impl;


import Backend.StockMatchBackend.model.CompanyNews;
import Backend.StockMatchBackend.repository.CompanyNewsRepository;
import Backend.StockMatchBackend.services.CompanyNewsService;
import Backend.StockMatchBackend.services.dto.CompanyNewsResponseDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyNewsServiceImpl implements CompanyNewsService {

    private final CompanyNewsRepository companyNewsRepository;

    @Autowired
    public CompanyNewsServiceImpl(CompanyNewsRepository companyNewsRepository) {
        this.companyNewsRepository = companyNewsRepository;
    }

    @Override
    @Transactional
    public CompanyNews saveCompanyNews(CompanyNews companyNews) {
        return companyNewsRepository.save(companyNews);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompanyNews> getAllCompanyNews() {
        return companyNewsRepository.findAll();
    }

    @Override
    @Transactional
    public List<CompanyNews> saveAll(List<CompanyNews> companyNewsList) {
        return companyNewsRepository.saveAll(companyNewsList);
    }

    @Override
    @Transactional
    public void deleteNewsByTicker(String ticker) {
        companyNewsRepository.deleteByTicker(ticker);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompanyNewsResponseDTO> findByTicker(String ticker) {
        List<CompanyNews> newsList = companyNewsRepository.findByTicker(ticker);
        return newsList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CompanyNewsResponseDTO convertToDto(CompanyNews news) {
        CompanyNewsResponseDTO dto = new CompanyNewsResponseDTO();
        BeanUtils.copyProperties(news, dto);
        // Set additional properties if needed
        return dto;
    }



}
