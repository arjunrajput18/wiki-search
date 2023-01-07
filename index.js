let formElem = document.querySelector("#form");
let inputText = document.querySelector("#inputText");
let outputBox = document.querySelector("#output-box");


let wikipediaUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20`;

const constructedURL = (searchVal) => {
  return `${wikipediaUrl}&srsearch=${searchVal}`;
}



const showResult = (searchValue) => {
  // console.log(searchValue);

  fetch(constructedURL(searchValue))
    .then((response) => response.json())
    .then((data) => {
      let resultArr = data.query.search;
      displayResult(resultArr)
    })
    .catch((err) => console.log("Error Occured"));


}

const displayResult = (resultArr) => {
  // console.log(resultArr);

  outputBox.innerHTML = " ";

  resultArr.length > 0 ?
    outputBox.insertAdjacentHTML("beforeend", `<h2>Search Results for <br/> ${inputText.value}</h2>`) :
    outputBox.insertAdjacentHTML("beforeend", `<h2>No Data Found🤪 for <br/> ${inputText.value}</h2>`)

  resultArr.forEach((item) => {
    let itemTitle = item.title;
    let itemDescription = item.snippet;
    let itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${itemTitle}`);

    outputBox.insertAdjacentHTML("beforeend",
      `<div class="output-div">
      <h3 id="title">${itemTitle}</h3>
      <p id="description">${itemDescription}</p>
      <a href=${itemUrl} id="url" target="_blank" >Read more</a>
      </div>`
    );
   

  })
}

formElem.addEventListener("submit", function (event) {
  event.preventDefault();
  
  showResult(inputText.value);
})

