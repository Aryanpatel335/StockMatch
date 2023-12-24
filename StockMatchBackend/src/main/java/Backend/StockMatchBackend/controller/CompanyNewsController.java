package Backend.StockMatchBackend.controller;

import Backend.StockMatchBackend.model.CompanyNews;
import Backend.StockMatchBackend.services.CompanyNewsService;
import Backend.StockMatchBackend.services.dto.CompanyNewsDTO;
import Backend.StockMatchBackend.services.dto.CompanyNewsResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.time.Instant;

@RestController
@RequestMapping("/companyNews")
public class CompanyNewsController {

    private final CompanyNewsService companyNewsService;

    @Autowired
    public CompanyNewsController(CompanyNewsService companyNewsService) {
        this.companyNewsService = companyNewsService;
    }

//    @PostMapping("/receiveCompanyNews")
//    public ResponseEntity<?> receiveCompanyNews(@RequestBody List<CompanyNewsDTO> companyNewsList) {
//        try {
//            CompanyNews savedNews = companyNewsService.saveCompanyNews(companyNews);
//            return new ResponseEntity<>(savedNews, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @PostMapping("/receiveCompanyNews")
    public ResponseEntity<?> receiveCompanyNews(@RequestBody List<CompanyNewsDTO> companyNewsDTOList) {
        if (!companyNewsDTOList.isEmpty()) {
            // Assuming all news items have the same ticker
            String ticker = companyNewsDTOList.get(0).getTicker();
            companyNewsService.deleteNewsByTicker(ticker);
        }
        List<CompanyNews> companyNewsList = companyNewsDTOList.stream()
                .map(this::convertToEntity)
                .collect(Collectors.toList());
        companyNewsService.saveAll(companyNewsList);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/getCompanyNews")
    public ResponseEntity<List<CompanyNewsResponseDTO>> getCompanyNews(@RequestParam String ticker) {
        List<CompanyNewsResponseDTO> newsDtoList = companyNewsService.findByTicker(ticker);
        if (newsDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(newsDtoList, HttpStatus.OK);
    }



    private CompanyNews convertToEntity(CompanyNewsDTO dto) {
        CompanyNews entity = new CompanyNews();

        entity.setTicker(dto.getTicker());
        entity.setCategory(dto.getCategory());
        entity.setHeadline(dto.getHeadline());
        entity.setImageUrl(dto.getImage());
        entity.setSource(dto.getSource());
        entity.setSummary(dto.getSummary());
        entity.setNewsUrl(dto.getUrl());
        entity.setRelated(dto.getRelated());
        entity.setDatetime(dto.getDatetime());

        return entity;
    }

}
