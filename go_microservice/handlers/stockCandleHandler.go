package handlers

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"

	finnhub "github.com/Finnhub-Stock-API/finnhub-go/v2"
)

type StockCandleData struct {
	Ticker 	  string	`json:"ticker"`
	Close     []float32 `json:"c"`
	High      []float32 `json:"h"`
	Low       []float32 `json:"l"`
	Open      []float32 `json:"o"`
	Status    string    `json:"s"`
	Timestamp []int64   `json:"t"`
	Volume    []int64   `json:"v"`
}

func StockCandlesHandler(w http.ResponseWriter, r *http.Request) {
	// http.HandleFunc("/stockCandles", func(w http.ResponseWriter, r *http.Request) {
	err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

	symbol := r.URL.Query().Get("symbol")
	if symbol == "" {
		http.Error(w, "Missing symbol parameter", http.StatusBadRequest)
		return
	}

	// Define the time range for one month
	now := time.Now()
	oneMonthAgo := now.AddDate(0, -1, 0) // Subtract one month from the current time

	// Fetch the stock candles data
	candles, err := fetchStockCandles(symbol, oneMonthAgo, now)
	if err != nil {
		http.Error(w, "Error fetching stock candles: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Convert the candles to the desired format, if necessary.
	// For simplicity, we marshal the candles into JSON.
	jsonData, err := json.Marshal(candles)
	if err != nil {
		http.Error(w, "Error marshalling JSON: "+err.Error(), http.StatusInternalServerError)
		return
	}
	springAPIBaseURL := os.Getenv("SPRING_API_URL")
    if springAPIBaseURL == "" {
        log.Fatal("SPRING_API_URL is not set")
    }

	// Define the URL of your Spring backend endpoint
	springURL := springAPIBaseURL + "/stockCandles/receiveStockCandles"

	// Send the JSON data to the Spring backend
	err = sendToSpringBackendStockCandles(jsonData, springURL)
	if err != nil {
		http.Error(w, "Error sending data to backend: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond to the original request indicating success
	fmt.Fprintln(w, "Stock candle data sent to Spring backend successfully")
// })

// log.Println("Stock candles handler is starting on :3000...")
// log.Fatal(http.ListenAndServe(":3000", nil))
}

func fetchStockCandles(symbol string, oneMonthAgo, now time.Time) (StockCandleData, error) {
	apiToken := os.Getenv("FINNHUB_API_TOKEN")
	cfg := finnhub.NewConfiguration()
	cfg.AddDefaultHeader("X-Finnhub-Token", apiToken)
	finnhubClient := finnhub.NewAPIClient(cfg).DefaultApi

	toTimestamp := now.Unix()
	fromTimestamp := oneMonthAgo.Unix()	
	// Define the time range for one month
	res, _, err := finnhubClient.StockCandles(context.Background()).
		Symbol(symbol).
		Resolution("D").
		From(int64(fromTimestamp)).
		To(int64(toTimestamp)).
		Execute()
	if err != nil {
		return StockCandleData{}, fmt.Errorf("error fetching stock candles: %w", err)
	}

	// Extract data using getters
	candles := StockCandleData{
		Ticker: symbol,
		Close:     res.GetC(),
		High:      res.GetH(),
		Low:       res.GetL(),
		Open:      res.GetO(),
		Status:    res.GetS(),
		Timestamp: res.GetT()}

	return candles, nil
}

func sendToSpringBackendStockCandles(jsonData []byte, springURL string) error {
	// Create a new HTTP request with the JSON payload
	req, err := http.NewRequest(http.MethodPost, springURL, bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("error creating request to Spring backend: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("error sending request to Spring backend: %w", err)
	}
	defer resp.Body.Close()

	// Check for a successful response
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("spring backend returned error: %s", resp.Status)
	}

	fmt.Println("Data sent to Spring backend successfully")
	return nil
}