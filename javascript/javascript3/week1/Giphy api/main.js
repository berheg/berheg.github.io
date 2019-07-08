/*Searching a word gives gif images and can be specified 
how many gif images you want before or after search
*/
const searchBtn = document.getElementById("searchBtn");
const img = document.getElementById("ans-img");
const imageContainer = document.querySelector('div.imageContainer');
const searchInput = document.querySelector('input.searchInput');
const numImages = document.querySelector('input.numInput');
let notice = document.querySelector('p.notice');
const key = "Xe7GmIA81Tx5vLjHznMmWwJxuWxUQYb9";
//urlArray is used to save the Json data object from api fetch
let urlArray = [];
//Json object is fetch and the data is passed to showImages function
function getImage() {
  if(searchInput.value===''){
    notice.innerHTML = 'Please insert word!!!!';  
  }else{
    const searchValue = searchInput.value
    console.log(searchValue);
    const api = `https://api.giphy.com/v1/gifs/search?api_key=${key}&limit=25&offset=0&rating=G&lang=en&q=${searchValue}`
    fetch(api)
      .then(resp => resp.json())
      .then(json => {
        //json object is passed to be displayed and manupilate as we want
        showImages(json);
        console.log(json);               
        console.log(json.data[0].images.fixed_height.url);        
      });
  }    
} 
//remove innetHtml of paragraph notice
function removeNotice(){
  notice.innerHTML = ''
};
//showImages function saves the object as array and displays as image
function showImages(objJson){
  notice.innerHTML = '';
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
//removes search input value when we need
function removeInputValue(){
  numImages.value = '';
  
}
//removes search value
function removeSearchValue(){
  searchInput.value ='';
}
//displays specified number of images 
function showImagesWithLimit(){
  notice.innerHTML = '';
  if(numImages.value <= 25){
    removeItems(imageContainer);
    for( i=0; i < numImages.value;i++){
      const image = document.createElement("img");
      image.setAttribute("src", urlArray[i]);
      imageContainer.appendChild(image);
    }
  }else
    notice.innerHTML = 'Number < 26!!!!';  
}
//removes images from the screen when we need
function removeItems(item) {
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
}
//searchInput keyup listener
searchInput.addEventListener('keyup', removeNotice);
//searchInput onfocus listener
searchInput.addEventListener('focus', removeSearchValue);
//search button click listener
searchBtn.addEventListener("click", getImage);
//numImages input blur listener
numImages.addEventListener('blur', showImagesWithLimit); 