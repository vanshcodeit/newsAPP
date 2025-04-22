const API_KEY = "4f9990accd43464c99a20ea63e86ff66";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load" , ()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews (query){
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        // Handle error (e.g., show error message on UI)
    }
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone);

    });


}

function fillDataInCard(cardClone , article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US" , {
        timeZone: "Asia/jakarta"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}


let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    if (curSelectedNav) {
        curSelectedNav.classList.remove("active");
    }
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");


searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query)  return;
    fetchNews(query);


    curSelectedNav?.classList.remove(`active`);
    curSelectedNav = null;
            
            
        
});
