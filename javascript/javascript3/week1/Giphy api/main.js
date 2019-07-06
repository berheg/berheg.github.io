const searchBtn = document.getElementById("searchBtn");
const img = document.getElementById("ans-img");
const imageContainer = document.querySelector('div.imageContainer');
const searchInput = document.querySelector('input.searchInput');
const numImages = document.querySelector('input.numInput');
let notice = document.querySelector('p.notice');
const key = "Xe7GmIA81Tx5vLjHznMmWwJxuWxUQYb9";
let urlArray = [];
function getImage() {
  if(searchInput.value===''){
    notice.innerHTML = 'Please insert value below!!!!';  
  }else{
    const searchValue = searchInput.value
    console.log(searchValue);
    const api = `https://api.giphy.com/v1/gifs/search?api_key=${key}&limit=25&offset=0&rating=G&lang=en&q=${searchValue}`
    fetch(api)
      .then(resp => resp.json())
      .then(json => {
        showImages(json);
        console.log(json);               
        console.log(json.data[0].images.fixed_height.url);        
      });
  }    
} 
searchInput.addEventListener('keyup', removeNotice);
searchInput.addEventListener('focus', removeSearchValue);
//searchInput.addEventListener('blur', showSearchInputPlaceHolder);
searchBtn.addEventListener("click", getImage);
//numImages.addEventListener('focus', removeInputValue);
numImages.addEventListener('blur', showImagesWithLimit);
function removeNotice(){
  notice.innerHTML = ''
};
function showImages(objJson){
    urlArray = objJson.data.map(
    obj => obj.images.fixed_height.url);
    removeItems(imageContainer);
    if(numImages.value){
      showImagesWithLimit();
    }else{
      urlArray.forEach(element => {
        const image = document.createElement("img");
        image.setAttribute("src", element);
        imageContainer.appendChild(image);
      });
    }
  
}
function removeInputValue(){
  numImages.value = ''
}
function removeSearchValue(){
  searchInput.value ='';
}
/*function showPlaceHolder(){
  showImages();
}*/
function showImagesWithLimit(){
  removeItems(imageContainer);
  for( i=0; i < numImages.value;i++){
    const image = document.createElement("img");
    image.setAttribute("src", urlArray[i]);
    imageContainer.appendChild(image);
  
  }
}
function removeItems(item) {
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
} 