# Stock Dashboard

This project provides a very small static web application for the stock tickers **NVDA** and **TSLA**. The app now fetches live statistics, options data and recent news from public APIs.

## Setup
1. Edit `webapp/script.js` and replace the `YOUR_ALPHA_VANTAGE_KEY` and `YOUR_NEWS_API_KEY` placeholders with your own API keys.
2. Start a local web server from the `webapp` folder (for example `python3 -m http.server`). Browsers often block network requests when opening the file directly.
3. Navigate to `http://localhost:8000/index.html` and the dashboard will retrieve the latest data.

Without network access the page will still load, but it will show empty results.
