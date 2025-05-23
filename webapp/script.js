const data = {
    NVDA: {
        prices: [440, 442, 450, 455, 460, 458, 462],
        news: {
            title: "AI chip demand keeps rising",
            link: "https://example.com/nvda-news"
        }
    },
    TSLA: {
        prices: [250, 252, 251, 255, 257, 260, 259],
        news: {
            title: "New software update announced",
            link: "https://example.com/tsla-news"
        }
    }
};

function createChart(ctx, prices) {
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const stepX = ctx.canvas.width / (prices.length - 1);
    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height - (prices[0] - minPrice) / (maxPrice - minPrice) * ctx.canvas.height);
    for (let i = 1; i < prices.length; i++) {
        const x = i * stepX;
        const y = ctx.canvas.height - (prices[i] - minPrice) / (maxPrice - minPrice) * ctx.canvas.height;
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function renderTicker(ticker) {
    const info = data[ticker];
    const prices = info.prices;
    const currentPrice = prices[prices.length - 1];
    const yesterdayClose = prices[prices.length - 2];
    const change = ((currentPrice - yesterdayClose) / yesterdayClose * 100).toFixed(2);

    const container = document.createElement('div');
    container.className = 'ticker';

    const title = document.createElement('h2');
    title.textContent = ticker;
    container.appendChild(title);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;
    canvas.className = 'chart';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    createChart(ctx, prices);

    const priceDiv = document.createElement('div');
    priceDiv.innerHTML = `<strong>Current Price:</strong> $${currentPrice.toFixed(2)} (${change}% from yesterday)`;
    container.appendChild(priceDiv);

    const optionsTable = document.createElement('table');
    optionsTable.className = 'options-table';
    const header = document.createElement('tr');
    header.innerHTML = '<th>Strike</th><th>Premium</th>';
    optionsTable.appendChild(header);
    for (let i = -20; i <= 20; i++) {
        if (i === 0) continue;
        const strike = (currentPrice + i).toFixed(2);
        const row = document.createElement('tr');
        row.innerHTML = `<td>$${strike}</td><td>$0.50</td>`;
        optionsTable.appendChild(row);
    }
    container.appendChild(optionsTable);

    const newsDiv = document.createElement('div');
    newsDiv.innerHTML = `<strong>News:</strong> <a href="${info.news.link}">${info.news.title}</a>`;
    container.appendChild(newsDiv);

    document.getElementById('ticker-container').appendChild(container);
}

['NVDA', 'TSLA'].forEach(renderTicker);
