const searchBtn = document.getElementById("searchBtn");
const img = document.getElementById("ans-img");
const searchInput = document.querySelector('input.searchInput');
let notice = document.querySelector('p.notice');
function getImage() {
  if(searchInput.value===''){
    notice.innerHTML = 'Please insert value below!!!!';  
  }else{
    fetch("https://api.giphy.com/v1/gifs/search?api_key=Xe7GmIA81Tx5vLjHznMmWwJxuWxUQYb9&q=smile&limit=25&offset=0&rating=G&lang=en")
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
        // code here         
        const proxy = "https://cors-anywhere.herokuapp.com/"       
        console.log(json.data[0].embed_url);
        img.src = `${proxy}${json.data[0].analytics.embed_url}`;
      });
  }    
}
  
  //loadAnswer();
searchInput.addEventListener('keyup', removeNotice);
searchBtn.addEventListener("click", getImage);
function removeNotice(){
  notice.innerHTML = ''
};
  