package Backend.StockMatchBackend.services.impl;

import Backend.StockMatchBackend.model.StockTable;
import Backend.StockMatchBackend.repository.StockTableRepository;
import Backend.StockMatchBackend.services.StockTableService;
import Backend.StockMatchBackend.services.dto.StockTableDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class StockTableServiceImpl implements StockTableService {
    @Autowired
    private StockTableRepository stockTableRepository; // Assuming you have a repository

    public StockTable addStockInfo(StockTableDTO stockTableDTO) {
        StockTable stockTable = stockTableRepository.findBySymbol(stockTableDTO.getSymbol())
                .orElse(new StockTable());
//        System.out.println(stockTableDTO.getFinnhubIndustry());

        mapDtoToStockInfo(stockTable, stockTableDTO);

        return stockTableRepository.save(stockTable);
    }

    private void mapDtoToStockInfo(StockTable stockTable, StockTableDTO stockTableDTO) {
        stockTable.setSymbol(stockTableDTO.getSymbol());
        stockTable.setPrevDayClose(stockTableDTO.getPrevDayClose());
        stockTable.setCountry(stockTableDTO.getCountry());
        stockTable.setCurrency(stockTableDTO.getCurrency());
        stockTable.setExchange(stockTableDTO.getExchange());
        stockTable.setIpo(stockTableDTO.getIpo());
        stockTable.setMarketCapitalization(stockTableDTO.getMarketCapitalization());
        stockTable.setName(stockTableDTO.getName());
        stockTable.setTicker(stockTableDTO.getTicker());
        stockTable.setWebUrl(stockTableDTO.getWebUrl());
        stockTable.setLogo(stockTableDTO.getLogo());
        stockTable.setFinnhubIndustry(stockTableDTO.getFinnhubIndustry());
        stockTable.setWeekHigh(stockTableDTO.getWeekHigh());
        stockTable.setWeekLow(stockTableDTO.getWeekLow());
        stockTable.setWeekLowDate(stockTableDTO.getWeekLowDate());
        stockTable.setBeta(stockTableDTO.getBeta());
        stockTable.setMarketLink1(stockTableDTO.getMarketLink1());
        stockTable.setMarketLink2(stockTableDTO.getMarketLink2());
        stockTable.setMarketLink3(stockTableDTO.getMarketLink3());
    }
}
