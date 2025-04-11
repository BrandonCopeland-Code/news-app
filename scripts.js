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
    for (const article of articles) {
        const articleDiv = document.createElement("div");

        //title
        const title = document.createElement("h4");
        title.textContent = article.title;
        articleDiv.appendChild(title);

        //description
        const description = document.createElement("p");
        description.textContent = article.description;
        articleDiv.appendChild(description);

        //image
        const image = document.createElement("img");
        image.src = article.urlToImage;
        articleDiv.appendChild(image);

        //url
        const urlNews = document.createElement("a");
        urlNews.href = article.url;
        urlNews.textContent = "Read the full article";
        articleDiv.appendChild(urlNews);

        //append div
        newsDiv.appendChild(articleDiv);
    }
}

fetchNews();