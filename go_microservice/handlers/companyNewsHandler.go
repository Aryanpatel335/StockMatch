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

    finnhub "github.com/Finnhub-Stock-API/finnhub-go/v2"
    "github.com/joho/godotenv"
)

type CompanyNews struct {
    Ticker   string `json:"ticker"`
    Category string `json:"category"`
    Datetime int64  `json:"datetime"`
    Headline string `json:"headline"`
    ID       int    `json:"id"`
    Image    string `json:"image"`
    Related  string `json:"related"`
    Source   string `json:"source"`
    Summary  string `json:"summary"`
    URL      string `json:"url"`
}

func CompanyNewsHandler(w http.ResponseWriter, r *http.Request) {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    symbol := r.URL.Query().Get("symbol")
    if symbol == "" {
        http.Error(w, "Missing symbol parameter", http.StatusBadRequest)
        return
    }

    now := time.Now()
    oneMonthAgo := now.AddDate(0, -1, 0)

    news, err := fetchCompanyNews(symbol, oneMonthAgo, now)
    if err != nil {
        http.Error(w, "Error fetching company news: "+err.Error(), http.StatusInternalServerError)
        return
    }

    jsonData, err := json.Marshal(news)
    if err != nil {
        http.Error(w, "Error marshalling JSON: "+err.Error(), http.StatusInternalServerError)
        return
    }

    springAPIBaseURL := os.Getenv("SPRING_API_URL")
    if springAPIBaseURL == "" {
        log.Fatal("SPRING_API_URL is not set")
    }

    springURL := springAPIBaseURL + "/api/companyNews/receiveCompanyNews"
    fmt.Println("Company News URL:", springURL)

    err = sendToSpringBackendCompanyNews(jsonData, springURL)
    if err != nil {
        http.Error(w, "Error sending data to backend: "+err.Error(), http.StatusInternalServerError)
        return
    }

    fmt.Fprintln(w, "Company news data sent to Spring backend successfully")
}

// func fetchCompanyNews(symbol string, oneMonthAgo, now time.Time) ([]CompanyNews, error) {
//     apiToken := os.Getenv("FINNHUB_API_TOKEN")
//     if apiToken == "" {
//         log.Fatal("FINNHUB_API_TOKEN is not set")
//     }

//     cfg := finnhub.NewConfiguration()
//     cfg.AddDefaultHeader("X-Finnhub-Token", apiToken)
//     finnhubClient := finnhub.NewAPIClient(cfg).DefaultApi

//     toTimestamp := now.Format("2006-01-02")
//     fromTimestamp := oneMonthAgo.Format("2006-01-02")

//     res, _, err := finnhubClient.CompanyNews(context.Background()).Symbol(symbol).From(fromTimestamp).To(toTimestamp).Execute()
//     if err != nil {
//         return nil, fmt.Errorf("error fetching company news: %w", err)
//     }

//     news := make([]CompanyNews, len(res))
//     for i, item := range res {
//         news[i] = CompanyNews{
//             Ticker:   symbol,
//             Category: item.GetCategory(),
//             Datetime: item.GetDatetime(),
//             Headline: item.GetHeadline(),
//             ID:       int(item.GetId()),
//             Image:    item.GetImage(),
//             Related:  item.GetRelated(),
//             Source:   item.GetSource(),
//             Summary:  item.GetSummary(),
//             URL:      item.GetUrl(),
//         }
//     }

//     return news, nil
// }

func fetchCompanyNews(symbol string, oneMonthAgo, now time.Time) ([]CompanyNews, error) {
    apiToken := os.Getenv("FINNHUB_API_TOKEN")
    if apiToken == "" {
        log.Fatal("FINNHUB_API_TOKEN is not set")
    }

    cfg := finnhub.NewConfiguration()
    cfg.AddDefaultHeader("X-Finnhub-Token", apiToken)
    finnhubClient := finnhub.NewAPIClient(cfg).DefaultApi

    toTimestamp := now.Format("2006-01-02")
    fromTimestamp := oneMonthAgo.Format("2006-01-02")

    res, _, err := finnhubClient.CompanyNews(context.Background()).Symbol(symbol).From(fromTimestamp).To(toTimestamp).Execute()
    if err != nil {
        return nil, fmt.Errorf("error fetching company news: %w", err)
    }

    // Truncate the results to the top 6 news items
    maxItems := 3
    if len(res) > maxItems {
        res = res[:maxItems]
    }

    news := make([]CompanyNews, len(res))
    for i, item := range res {
        news[i] = CompanyNews{
            Ticker:   symbol,
            Category: item.GetCategory(),
            Datetime: item.GetDatetime(),
            Headline: item.GetHeadline(),
            ID:       int(item.GetId()),
            Image:    item.GetImage(),
            Related:  item.GetRelated(),
            Source:   item.GetSource(),
            Summary:  item.GetSummary(),
            URL:      item.GetUrl(),
        }
    }

    return news, nil
}

func sendToSpringBackendCompanyNews(jsonData []byte, springURL string) error {
    req, err := http.NewRequest(http.MethodPost, springURL, bytes.NewBuffer(jsonData))
    if err != nil {
        return fmt.Errorf("error creating request to Spring backend: %w", err)
    }
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return fmt.Errorf("error sending request to Spring backend: %w", err)
    }
    defer resp.Body.Close()

    // Check for a 201 Created status code, which indicates success
    if resp.StatusCode != http.StatusCreated {
        return fmt.Errorf("unexpected response from Spring backend: %s", resp.Status)
    }

    fmt.Println("Data sent to Spring backend successfully and a new resource was created")
    return nil
}

