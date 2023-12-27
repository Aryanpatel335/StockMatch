import requests
import time

# Read symbols from the file
with open('resources/sp500_symbols.txt', 'r') as file:
    symbols = file.read().splitlines()

# Base URL
base_url = 'http://127.0.0.1:5000/fetch-and-send-stock/'

# Iterate over each symbol and make a request
for symbol in symbols:
    full_url = base_url + symbol  # Append the symbol to the URL
    response = requests.get(full_url)
    
    print(response)
    
    # Sleep for 3.5 seconds before the next request
    time.sleep(3.5)
