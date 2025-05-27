const STOCK_API_KEY = 'YOUR_ALPHA_VANTAGE_KEY';
const NEWS_API_KEY = 'YOUR_NEWS_API_KEY';
const symbols = ['NVDA', 'TSLA'];

async function fetchStats(symbol) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${STOCK_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const q = data['Global Quote'] || {};
    return {
        price: parseFloat(q['05. price']) || 0,
        open: parseFloat(q['02. open']) || 0,
        high: parseFloat(q['03. high']) || 0,
        low: parseFloat(q['04. low']) || 0,
        volume: parseInt(q['06. volume'] || '0', 10)
    };
}

async function fetchOptions(symbol) {
    const url = `https://query2.finance.yahoo.com/v7/finance/options/${symbol}`;
    const res = await fetch(url);
    const data = await res.json();
    const opts = data.optionChain?.result?.[0]?.options?.[0];
    if (!opts) return [];
    const calls = opts.calls.slice(0, 3);
    const puts = opts.puts.slice(0, 3);
    return calls.map((c, idx) => ({
        strike: c.strike,
        call: c.lastPrice,
        put: (puts[idx] ? puts[idx].lastPrice : 0)
    }));
}

async function fetchNews(symbol) {
    const url = `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${NEWS_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return (data.articles || []).slice(0, 3).map(a => ({
        headline: a.title,
        description: a.description || ''
    }));
}

function renderStats(stats) {
    const div = document.createElement('div');
    div.className = 'stats';
    div.innerHTML = `
        <strong>Price:</strong> $${stats.price.toFixed(2)}
        | <strong>Open:</strong> $${stats.open.toFixed(2)}
        | <strong>High:</strong> $${stats.high.toFixed(2)}
        | <strong>Low:</strong> $${stats.low.toFixed(2)}
        | <strong>Volume:</strong> ${stats.volume.toLocaleString()}
    `;
    return div;
}

function renderOptions(options) {
    const table = document.createElement('table');
    table.className = 'options-table';
    const header = document.createElement('tr');
    header.innerHTML = '<th>Strike</th><th>Call</th><th>Put</th>';
    table.appendChild(header);
    options.forEach(opt => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>$${opt.strike}</td><td>$${opt.call}</td><td>$${opt.put}</td>`;
        table.appendChild(row);
    });
    return table;
}

function renderNews(newsItems) {
    const div = document.createElement('div');
    newsItems.forEach(item => {
        const n = document.createElement('div');
        n.className = 'news-item';
        n.innerHTML = `<strong>${item.headline}:</strong> ${item.description}`;
        div.appendChild(n);
    });
    return div;
}

function renderTicker(symbol, info) {
    const container = document.createElement('div');
    container.className = 'ticker';

    const title = document.createElement('h2');
    title.textContent = symbol;
    container.appendChild(title);

    container.appendChild(renderStats(info.stats));
    container.appendChild(renderOptions(info.options));
    container.appendChild(renderNews(info.news));

    document.getElementById('tickers').appendChild(container);
}

async function loadTicker(symbol) {
    const [stats, options, news] = await Promise.all([
        fetchStats(symbol),
        fetchOptions(symbol),
        fetchNews(symbol)
    ]);
    renderTicker(symbol, { stats, options, news });
}

symbols.forEach(loadTicker);
