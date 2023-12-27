import requests
import time


with open('resources/sp500_symbols.txt', 'r') as file:
    symbols = file.read().splitlines()

# Base URL
base_url = 'http://localhost:3000/getCompanyNews'

for symbol in symbols:
    params = {'symbol': symbol}
    response = requests.get(base_url, params=params)
    
    print(response)
    
    time.sleep(5)