const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
     try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayNews(data.articles);
    } catch(error) {
        console.error(error);
    }
}

function displayNews(articles) {
    const newsDiv = document.getElementById("news");
    newsDiv.className = 'row';

    for (const article of articles) {
        // Column wrapper
        const col = document.createElement("div");
        col.className = 'col-md-6 col-lg-4 mb-4 d-flex';

        // Bootstrap card
        const card = document.createElement("div");
        card.className = 'card h-100';

        // Image
        if (article.urlToImage) {
            const image = document.createElement("img");
            image.src = article.urlToImage;
            image.classList.add("card-img-top");
            card.appendChild(image);
        }

        // Card body
        const cardBody = document.createElement("div");
        cardBody.className = 'card-body d-flex flex-column';

        // Title
        const title = document.createElement("h5");
        title.textContent = article.title;
        title.className = "card-title";
        cardBody.appendChild(title);

        // Description
        const description = document.createElement("p");
        description.textContent = article.description || '';
        description.classList.add("card-text");
        cardBody.appendChild(description);

        // Button
        const urlNews = document.createElement("a");
        urlNews.href = article.url;
        urlNews.target = '_blank';
        urlNews.classList.add("btn", "btn-primary", "mt-auto");
        urlNews.textContent = "Read the full article";
        cardBody.appendChild(urlNews);

        // Assemble card
        card.appendChild(cardBody);
        col.appendChild(card);
        newsDiv.appendChild(col);
    }
}


fetchNews();