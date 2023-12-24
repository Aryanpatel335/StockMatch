package main

// assuming this is the package
import (
	"log"
	"my_microservice/handlers"
	"net/http"
)


func main() {
	
	//this is what gets the StockInfo for the stocks
	http.HandleFunc("/getStock", handlers.StockTableHandler)
	http.HandleFunc("/stockCandles", handlers.StockCandlesHandler)
	http.HandleFunc("/getCompanyNews", handlers.CompanyNewsHandler)
	// You can add more handlers for different endpoints as needed

	// Start the server on port 3000
	log.Println("Server starting on port 3000...")
	if err := http.ListenAndServe(":3000", nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
	// handlers.StockQuoteHandler()
	// handlers.StockCandlesHandler()