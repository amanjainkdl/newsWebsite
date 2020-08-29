let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://newsapi.org/v2/top-headlines?country=in&apiKey=d09369f8f1484b25a09f79adb9e590e4', true);
xhr.onprogress = function () {
    console.log("In progress");
}
xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
xhr.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With");
xhr.setRequestHeader('Content-type', 'application/json');
xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
xhr.onload = function () {
    newsObj = JSON.parse(this.responseText);
    if (newsObj['status'] == 'ok') {
        populateNewsONScreen(newsObj);
    }
    else{
        let errorBox = document.createElement('div');
        errorBox.innerHTML = `<p style="font-size:30px;">You are not connected with internet.</p>`;
        document.getElementById('innerDiv').appendChild(errorBox);;
    }
    console.log(newsObj);
}

xhr.send();

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