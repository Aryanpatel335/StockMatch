package Backend.StockMatchBackend.services.impl;

import Backend.StockMatchBackend.model.StockCandle;
import Backend.StockMatchBackend.repository.StockCandleRepository;
import Backend.StockMatchBackend.services.StockCandleService;
import Backend.StockMatchBackend.services.dto.StockCandleDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class StockCandleServiceImpl implements StockCandleService {

    private static final java.util.UUID UUID = java.util.UUID.randomUUID();
    @Autowired
    private StockCandleRepository stockCandleRepository;

    @Override
    public void saveStockCandles(StockCandleDTO stockCandleDTO) {
        List<StockCandle> candles = new ArrayList<>();
        for (int i = 0; i < stockCandleDTO.getT().size(); i++) {
            StockCandle candle = new StockCandle();
            candle.setId(UUID.randomUUID()); // Assuming ID is not auto-generated
            candle.setTicker(stockCandleDTO.getTicker());
            candle.setUniqueCandleTimestamp(Instant.ofEpochSecond(stockCandleDTO.getT().get(i)));
            candle.setOpen(stockCandleDTO.getO().get(i));
            candle.setHigh(stockCandleDTO.getH().get(i));
            candle.setLow(stockCandleDTO.getL().get(i));
            candle.setClose(stockCandleDTO.getC().get(i));
            // Set volume if it's not null
            if (stockCandleDTO.getV() != null) {
                candle.setVolume(stockCandleDTO.getV().get(i));
            }
            candles.add(candle);
        }
        stockCandleRepository.saveAll(candles); // Batch insert
    }

    @Override
    public List<StockCandle> getStockCandlesForGraph(String ticker) {
        return stockCandleRepository.findByTicker(ticker);
    }
    @Override
    public boolean tickerExists(String ticker) {
        return stockCandleRepository.existsByTicker(ticker);
    }

    @Override
    @Transactional
    public void replaceStockCandles(String ticker,StockCandleDTO newCandles) {
        // Delete all existing candles with the given ticker
        stockCandleRepository.deleteByTicker(ticker);

        // Save new candles
       saveStockCandles(newCandles);
    }




}