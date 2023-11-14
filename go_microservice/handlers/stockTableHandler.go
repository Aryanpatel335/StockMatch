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

	finnhub "github.com/Finnhub-Stock-API/finnhub-go/v2" // assuming this is the package
)

// ... other code ...
func fetchStockPrice(symbol string) (*float32, error) {
	apiToken := os.Getenv("FINNHUB_API_TOKEN")
    if apiToken == "" {
        log.Fatal("FINNHUB_API_TOKEN is not set")
    }

    cfg := finnhub.NewConfiguration()
    cfg.AddDefaultHeader("X-Finnhub-Token", apiToken)
    finnhubClient := finnhub.NewAPIClient(cfg).DefaultApi
    
    res, _, err := finnhubClient.Quote(context.Background()).Symbol(symbol).Execute()
    if err != nil {
        log.Printf("Error when calling `Quote`: %v", err)
    }
	value := res.GetPc() // assuming this returns a float32 value
    return &value, nil    // returns a pointer to the float32 value
}


func StockTableHandler(w http.ResponseWriter, r *http.Request) {
	// http.HandleFunc("/quote", func(w http.ResponseWriter, r *http.Request) {
	symbol := r.URL.Query().Get("symbol")
	if symbol == "" {
		http.Error(w, "Missing symbol parameter", http.StatusBadRequest)
		return
	}

	prevDayClose, err := fetchStockPrice(symbol)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a new struct that includes both the quote and the symbol
	type QuotePayload struct {
		Symbol string      `json:"symbol"`
		PrevDayClose  *float32 `json:"prevDayClose"`
	}

	// Initialize the new struct with the fetched quote and the symbol
	payload := QuotePayload{
		Symbol: symbol,
		PrevDayClose:  prevDayClose,
	}

	// Convert the quote to the desired format, if necessary.
	// For simplicity, we marshal the quote into JSON.
	jsonData, err := json.Marshal(payload)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		
		return
	}

	// Define the URL of your Spring backend endpoint
	springURL := "http://localhost:8080/stocks/receiveQuote"

	// Send the JSON data to the Spring backend
	err = sendToSpringBackend(jsonData, springURL)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond to the original request indicating success
	fmt.Fprintln(w, "Stock Data sent to Spring backend successfully")
		
	// })
	
	// log.Println("Starting server on :3000")
	// log.Fatal(http.ListenAndServe(":3000", nil))
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
		return fmt.Errorf("Spring backend returned error: %s", resp.Status)
	}
	

	return nil
}
