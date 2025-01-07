const accessKey = "gUv-DED4GnX3FTnIePcj2Dk1I8gCJTKRKXWKl5uHUZc";

const formEl = document.querySelector("form");
const searchInput = document.getElementById("search-input");

const searchResultsEl = document.querySelector(".search-results");

const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;


async function searchImage(){
    inputData = searchInput.value;
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResultsEl.innerHTML = "";
    }
    const results = data.results;

    results.map((result)=> {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);
        
    });
   
    page++;

    if (page > 1){
        showMoreButtonEl.style.display = "block";
    } 
    
}

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImage();
})

showMoreButtonEl.addEventListener("click", () => {
    searchImage();
})