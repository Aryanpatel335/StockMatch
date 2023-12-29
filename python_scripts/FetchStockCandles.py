from flask import Flask, jsonify
import yfinance as yf
import requests
import pandas as pd
import numpy as np

app = Flask(__name__)

@app.route('/fetch-and-send-stock/<ticker>')
def fetch_and_send_stock(ticker):
    # Fetch stock data from Yahoo Finance for a 1-month period
    stock = yf.Ticker(ticker)
    data = stock.history(period="1mo")

    # Prepare data in the format of StockCandleDTO
    timestamps = data.index.astype(np.int64) // 10**9

    # Prepare data in the format of StockCandleDTO
    stock_candle_dto = {
        'ticker': ticker,
        'c': data['Close'].round(2).tolist(),
        'h': data['High'].round(2).tolist(),
        'l': data['Low'].round(2).tolist(),
        'o': data['Open'].round(2).tolist(),
        't': timestamps.tolist(),
        'v': data['Volume'].tolist()
    }

    # Specify your Spring backend endpoint
    spring_endpoint = 'http://localhost:8080/api/stockCandles/receiveStockCandles'


    # Send data to Spring backend
    response = requests.post(spring_endpoint, json=stock_candle_dto)

    return jsonify({'status': response.status_code, 'message': response.text})

#RUN Using python FetchStockCandles.py

if __name__ == '__main__':
    app.run(debug=True)
