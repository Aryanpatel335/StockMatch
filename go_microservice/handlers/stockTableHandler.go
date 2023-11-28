package handlers

import (
	// ... other imports ...
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	finnhub "github.com/Finnhub-Stock-API/finnhub-go/v2" // assuming this is the package
)
type StockInfo struct {
    Symbol           string    `json:"symbol"`
    PrevDayClose     float32  `json:"prevDayClose"`
    Country             string  `json:"country"`
    Currency            string  `json:"currency"`
    Exchange            string  `json:"exchange"`
    IPO                 string  `json:"ipo"`
    MarketCapitalization float64 `json:"marketCapitalization"`
    Name                string  `json:"name"`
    Ticker              string  `json:"ticker"`
    WebURL              string  `json:"webUrl"`
    Logo                string  `json:"logo"`
    FinnhubIndustry     string  `json:"finnhubIndustry"`
    WeekHigh                float64 `json:"weekHigh"`
    WeekLow                 float64 `json:"weekLow"`
    WeekLowDate             string  `json:"weekLowDate"`
    Beta                    float64 `json:"beta"`
    MarketLink1 string `json:"marketLink1"`
    MarketLink2 string `json:"marketLink2"`
    MarketLink3 string `json:"marketLink3"`

}


type Metric struct {
    WeekHigh                float64 `json:"52WeekHigh"`
    WeekLow                 float64 `json:"52WeekLow"`
    WeekLowDate             string  `json:"52WeekLowDate"`
    Beta                    float64 `json:"beta"`
}


// ... other code ...
func fetchStockInfo(symbol string) (*StockInfo, error) {
    apiToken := os.Getenv("FINNHUB_API_TOKEN")
    if apiToken == "" {
        log.Fatal("FINNHUB_API_TOKEN is not set")
    }
	now := time.Now()

    // Format the 'to' date as YYYY-MM-DD
    toDate := now.Format("2006-01-02")

    // Calculate the date for one month ago and format it
    fromDate := now.AddDate(0, 0, -1).Format("2006-01-02")

    cfg := finnhub.NewConfiguration()
    cfg.AddDefaultHeader("X-Finnhub-Token", apiToken)
    finnhubClient := finnhub.NewAPIClient(cfg).DefaultApi

    res, _, err := finnhubClient.Quote(context.Background()).Symbol(symbol).Execute()
    if err != nil {
        return nil, fmt.Errorf("error fetching stock quote: %w", err)
    }

    resCompanyProfile, _, err := finnhubClient.CompanyProfile2(context.Background()).Symbol(symbol).Execute()
    if err != nil {
        return nil, fmt.Errorf("error fetching company profile: %w", err)
    }

    resCompanyNews, _, err := finnhubClient.CompanyNews(context.Background()).Symbol(symbol).From(fromDate).To(toDate).Execute()
    if err != nil {
        return nil, fmt.Errorf("error fetching company news: %w", err)
    }

	
	resBasicFins, _, err := finnhubClient.CompanyBasicFinancials(context.Background()).Symbol(symbol).Metric("metric").Execute()
    if err != nil {
        return nil, fmt.Errorf("error fetching company news: %w", err)
    }
	
	// Usage
	metricsMap := resBasicFins.GetMetric() // Assuming this returns map[string]interface{}
	// metrics := extractMetricsFromMap(metricsMap)

	

    stockInfo := &StockInfo{
        Symbol:         symbol,
        PrevDayClose:   res.GetPc(),
        Country: resCompanyProfile.GetCountry(),
		Currency : resCompanyProfile.GetCurrency(),          
		Exchange : resCompanyProfile.GetExchange(),
		IPO      : resCompanyProfile.GetIpo(),
		MarketCapitalization: float64(resCompanyProfile.GetMarketCapitalization()),
		Name                : resCompanyProfile.GetName(),
		Ticker             : resCompanyProfile.GetTicker(), 
		WebURL              : resCompanyProfile.GetWeburl(),
		Logo                : resCompanyProfile.GetLogo(),
		FinnhubIndustry     : resCompanyProfile.GetFinnhubIndustry(),
		WeekHigh            : metricsMap["52WeekHigh"].(float64),   
    	WeekLow             : metricsMap["52WeekLow"].(float64),
    	WeekLowDate         : metricsMap["52WeekLowDate"].(string),
    	Beta                : metricsMap["beta"].(float64),  
        MarketLink1: resCompanyNews[0].GetUrl() ,
		MarketLink2: resCompanyNews[1].GetUrl(),
		MarketLink3: resCompanyNews[2].GetUrl(),
    }
	
	//fmt.Printf("Stock Info: %+v\n", stockInfo.FinnhubIndustry)
	
    return stockInfo, nil
}



func StockTableHandler(w http.ResponseWriter, r *http.Request) {
    symbol := r.URL.Query().Get("symbol")
    if symbol == "" {
        http.Error(w, "Missing symbol parameter", http.StatusBadRequest)
        return
    }

    stockInfo, err := fetchStockInfo(symbol)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    jsonData, err := json.Marshal(stockInfo)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    springURL := "http://localhost:8080/stocks/addStock"
    err = sendToSpringBackend(jsonData, springURL)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    fmt.Fprintln(w, "Stock Data sent to Spring backend successfully")
}


// Modified function to accept JSON data as a byte slice
func sendToSpringBackend(jsonData []byte, springURL string) error {
	// Send a POST request to the Spring backend
	resp, err := http.Post(springURL, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Check the response from the Spring backend
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("spring backend returned error: %s", resp.Status)
	}
	

	return nil
}

//aside
// func extractMetricsFromMap(metricMap map[string]interface{}) Metric {
//     return Metric{
//         WeekHigh:                metricMap["52WeekHigh"].(float64),
//         WeekLow:                 metricMap["52WeekLow"].(float64),
//         WeekLowDate:             metricMap["52WeekLowDate"].(string),
//         Beta:                    metricMap["beta"].(float64),
//     }
// }
