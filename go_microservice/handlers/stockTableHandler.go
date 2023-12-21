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

	"github.com/joho/godotenv"

	finnhub "github.com/Finnhub-Stock-API/finnhub-go/v2" // assuming this is the package
)

// type StockInfo struct {
//     Symbol           string    `json:"symbol,omitempty"`
//     PrevDayClose     float32  `json:"prevDayClose,omitempty"`
//     Country             string  `json:"country,omitempty"`
//     Currency            string  `json:"currency,omitempty"`
//     Exchange            string  `json:"exchange,omitempty"`
//     IPO                 string  `json:"ipo,omitempty"`
//     MarketCapitalization float64 `json:"marketCapitalization,omitempty"`
//     Name                string  `json:"name,omitempty"`
//     Ticker              string  `json:"ticker,omitempty"`
//     WebURL              string  `json:"webUrl,omitempty"`
//     Logo                string  `json:"logo,omitempty"`
//     FinnhubIndustry     string  `json:"finnhubIndustry,omitempty"`
//     WeekHigh                float64 `json:"weekHigh,omitempty"`
//     WeekLow                 float64 `json:"weekLow,omitempty"`
//     WeekLowDate             string  `json:"weekLowDate,omitempty"`
//     Beta                    float64 `json:"beta,omitempty"`
//     MarketLink1 string `json:"marketLink1,omitempty"`
//     MarketLink2 string `json:"marketLink2,omitempty"`
//     MarketLink3 string `json:"marketLink3,omitempty"`

// }
type StockInfo struct {
    Symbol               *string  `json:"symbol,omitempty"`
    PrevDayClose         *float32 `json:"prevDayClose,omitempty"`
    Country              *string  `json:"country,omitempty"`
    Currency             *string  `json:"currency,omitempty"`
    Exchange             *string  `json:"exchange,omitempty"`
    IPO                  *string  `json:"ipo,omitempty"`
    MarketCapitalization *float64 `json:"marketCapitalization,omitempty"`
    Name                 *string  `json:"name,omitempty"`
    Ticker               *string  `json:"ticker,omitempty"`
    WebURL               *string  `json:"webUrl,omitempty"`
    Logo                 *string  `json:"logo,omitempty"`
    FinnhubIndustry      *string  `json:"finnhubIndustry,omitempty"`
    WeekHigh             *float64 `json:"weekHigh,omitempty"`
    WeekLow              *float64 `json:"weekLow,omitempty"`
    WeekLowDate          *string  `json:"weekLowDate,omitempty"`
    Beta                 *float64 `json:"beta,omitempty"`
    MarketLink1          *string  `json:"marketLink1,omitempty"`
    MarketLink2          *string  `json:"marketLink2,omitempty"`
    MarketLink3          *string  `json:"marketLink3,omitempty"`
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

	if resCompanyProfile.GetTicker() == "" {
        fmt.Println("Ticker is null or empty, aborting operation.")
        return nil, fmt.Errorf("ticker is null or empty")
    }

    // stockInfo := &StockInfo{
    //     Symbol:         symbol,
    //     PrevDayClose:   res.GetPc(),
    //     Country: resCompanyProfile.GetCountry(),
	// 	Currency : resCompanyProfile.GetCurrency(),          
	// 	Exchange : resCompanyProfile.GetExchange(),
	// 	IPO      : resCompanyProfile.GetIpo(),
	// 	MarketCapitalization: float64(resCompanyProfile.GetMarketCapitalization()),
	// 	Name                : resCompanyProfile.GetName(),
	// 	Ticker             : resCompanyProfile.GetTicker(), 
	// 	WebURL              : resCompanyProfile.GetWeburl(),
	// 	Logo                : resCompanyProfile.GetLogo(),
	// 	FinnhubIndustry     : resCompanyProfile.GetFinnhubIndustry(),
	// 	WeekHigh            : metricsMap["52WeekHigh"].(float64),   
    // 	WeekLow             : metricsMap["52WeekLow"].(float64),
    // 	WeekLowDate         : metricsMap["52WeekLowDate"].(string),
    // 	Beta                : metricsMap["beta"].(float64),  
    //     MarketLink1: resCompanyNews[0].GetUrl() ,
	// 	MarketLink2: resCompanyNews[1].GetUrl(),
	// 	MarketLink3: resCompanyNews[2].GetUrl(),
    // }
	stockInfo := &StockInfo{
		Symbol:               getStringPointer(symbol),
		PrevDayClose:         getFloat32Pointer(res.GetPc()),
		Country:              getStringPointer(resCompanyProfile.GetCountry()),
		Currency:             getStringPointer(resCompanyProfile.GetCurrency()),          
		Exchange:             getStringPointer(resCompanyProfile.GetExchange()),
		IPO:                  getStringPointer(resCompanyProfile.GetIpo()),
		MarketCapitalization: getFloat64Pointer(float64(resCompanyProfile.GetMarketCapitalization())),
		Name:                 getStringPointer(resCompanyProfile.GetName()),
		Ticker:               getStringPointer(resCompanyProfile.GetTicker()), 
		WebURL:               getStringPointer(resCompanyProfile.GetWeburl()),
		Logo:                 getStringPointer(resCompanyProfile.GetLogo()),
		FinnhubIndustry:      getStringPointer(resCompanyProfile.GetFinnhubIndustry()),
		WeekHigh:             safeFloat64Assert(metricsMap["52WeekHigh"]),   
		WeekLow:              safeFloat64Assert(metricsMap["52WeekLow"]),
		WeekLowDate:          safeStringAssert(metricsMap["52WeekLowDate"]),
		Beta:                 safeFloat64Assert(metricsMap["beta"]),
		MarketLink1:          getURLFromNews(resCompanyNews, 0),
		MarketLink2:          getURLFromNews(resCompanyNews, 0),
		MarketLink3:          getURLFromNews(resCompanyNews, 0),
	}
	
	
	//fmt.Printf("Stock Info: %+v\n", stockInfo)
	
    return stockInfo, nil
}



func StockTableHandler(w http.ResponseWriter, r *http.Request) {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }
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

    springAPIBaseURL := os.Getenv("SPRING_API_URL")
    if springAPIBaseURL == "" {
        log.Fatal("SPRING_API_URL is not set")
    }


    springURL := springAPIBaseURL + "/stocks/addStock"
    // fmt.Println("Stock Candles URL:", springURL)
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


func getStringPointer(value string) *string {
    if value == "" {
        return nil
    }
    return &value
}

func getFloat32Pointer(value float32) *float32 {
    if value == 0 { // Assuming 0 is the default value indicating 'nil'
        return nil
    }
    return &value
}

func getFloat64Pointer(value float64) *float64 {
    if value == 0 { // Assuming 0 is the default value indicating 'nil'
        return nil
    }
    return &value
}

func safeFloat64Assert(value interface{}) *float64 {
    if value == nil {
        return nil
    }
    val, ok := value.(float64)
    if !ok {
        // Handle or log the error if the assertion fails
        return nil
    }
    return &val
}

func safeStringAssert(value interface{}) *string {
    if value == nil {
        return nil
    }
    val, ok := value.(string)
    if !ok {
        // Handle or log the error if the assertion fails
        return nil
    }
    return &val
}

func getURLFromNews(news []finnhub.CompanyNews, index int) *string {
    if len(news) > index {
        url := news[index].GetUrl()
        if url == "" {
            return nil
        }
        return &url
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
