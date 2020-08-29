function sendXhrRequestAndGetNews(countryName) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://newsapi.org/v2/top-headlines?country=${countryName}&apiKey=d09369f8f1484b25a09f79adb9e590e4`, true);
    xhr.onprogress = function () {
        console.log("In progress");
    }

    xhr.onload = function () {
        newsObj = JSON.parse(this.responseText);
        if (newsObj['status'] == 'ok') {
            populateNewsONScreen(newsObj);
        }
        else {
            let errorBox = document.createElement('div');
            errorBox.innerHTML = `<p style="font-size:30px;">You are not connected with internet.</p>`;
            document.getElementById('innerDiv').appendChild(errorBox);;
        }
        console.log(newsObj);
    }

    xhr.send();
}

let countriesNews = {
    "Argentina": "ar",
    "Australia": "au",
    "Austria": "at",
    "Belgium": "be",
    "Brazil": "br",
    "Bulgaria": "bg",
    "Canada": "ca",
    "China": "cn",
    "Colombia": "co",
    "Cuba": "cu",
    "Czech Republic": "cz",
    "Egypt": "eg",
    "France": "fr",
    "Germany": "de",
    "Greece": "gr",
    "Hong Kong": "hk",
    "Hungary": "hu",
    "India": "in",
    "Indonesia": "id",
    "Ireland": "ie",
    "Israel": "il",
    "Italy": "it",
    "Japan": "jp",
    "Latvia": "lv",
    "Lithuania": "lt",
    "Malaysia": "my",
    "Mexico": "mx",
    "Morocco": "ma",
    "Netherlands": "nl",
    "New Zealand": "nz",
    "Nigeria": "ng",
    "Norway": "no",
    "Philippines": "ph",
    "Poland": "pl",
    "Portugal": "pt",
    "Romania": "ro",
    "Russia": "ru",
    "Saudi Arabia": "sa",
    "Serbia": "rs",
    "Singapore": "sg",
    "Slovakia": "sk",
    "Slovenia": "si",
    "South Africa": "za",
    "South Korea": "kr",
    "Sweden": "se",
    "Switzerland": "ch",
    "Taiwan": "tw",
    "Thailand": "th",
    "Turkey": "tr",
    "UAE": "ae",
    "Ukraine": "ua",
    "United Kingdom": "gb",
    "United States": "ve",
    "Venuzuela": "us"
};

let countiesDropdown = document.getElementById('countries');
let options = '';
Object.keys(countriesNews).forEach(element => {
    options += `<option class="option" value='${countriesNews[element]}'>${element}</option>`;
});
options += `<option value="" disabled selected>Select Country</option>`;
countiesDropdown.innerHTML = options;

function populateNewsONScreen(newsObj) {
    let parentBox = document.getElementById('innerDiv');
    let newsElement = '';
    newsObj['articles'].forEach(element => {
        newsElement += `<div class="newsWalaDaba">
                        <div class="headingNews">
                        <span class="heading">
                            ${element.title}
                        </span>
                        <i class="fa fa-angle-down fa-rotate-18" aria-hidden="true"></i>
                        </div>
                        <div class="newsDescription none-display">
                        ${element.description}<a href="${element.url} target="_blank"> Read more..</a>
                        </div>
                        </div>`;
    });
    parentBox.innerHTML = newsElement;
}



document.getElementById('innerDiv').addEventListener('click', toggle);

function getSelectedCountryNews(){
    let selectedCountry = document.getElementById('countries').value;
    sendXhrRequestAndGetNews(selectedCountry);
}

function toggle(element) {
    let innerElementsClicked = element.target.classList[0] == 'heading' || element.target.classList[0] == 'fa';
    if (element.target !== element.currentTarget && (element.target.classList[0] == 'headingNews' || innerElementsClicked)) {
        let targetElement = innerElementsClicked ? element.target.parentElement.nextElementSibling : element.target.nextElementSibling;
        let previousOpenDiv = document.getElementsByClassName("block-display")[0];
        targetElement.className = 'newsDescription block-display';
        if (previousOpenDiv) {
            previousOpenDiv.className = 'newsDescription none-display';
        }
    }
    element.stopPropagation();
}

let selectedCountryInDropdown = document.getElementById('countries').value;
sendXhrRequestAndGetNews(selectedCountryInDropdown.length > 0 ? selectedCountryInDropdown : 'in');