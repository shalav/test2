const tickers = {
    NVDA: {
        stats: { price: 465.12, open: 460.0, high: 470.0, low: 458.5, volume: 12000000 },
        options: [
            { strike: 440, call: 30.2, put: 5.1 },
            { strike: 460, call: 18.5, put: 8.3 },
            { strike: 480, call: 9.7, put: 14.6 }
        ],
        news: [
            { headline: 'New AI partnership announced', description: 'Nvidia partners with major cloud provider to accelerate AI workloads.' },
            { headline: 'Earnings beat expectations', description: 'Quarterly earnings and revenue exceed analyst forecasts.' }
        ]
    },
    TSLA: {
        stats: { price: 255.78, open: 250.2, high: 258.0, low: 249.5, volume: 15000000 },
        options: [
            { strike: 240, call: 28.1, put: 6.8 },
            { strike: 260, call: 15.4, put: 10.2 },
            { strike: 280, call: 7.0, put: 18.7 }
        ],
        news: [
            { headline: 'Software update rolls out', description: 'Tesla releases major OTA update with new features for drivers.' },
            { headline: 'Gigafactory expansion', description: 'Tesla plans additional production capacity at its existing Gigafactory.' }
        ]
    }
};

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

Object.entries(tickers).forEach(([symbol, info]) => renderTicker(symbol, info));
