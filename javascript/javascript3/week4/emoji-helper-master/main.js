/*
*Emoji search site JS
*
*/
console.log("Script loaded");
const searchField = document.getElementById("searchField");
const ulTag = document.querySelector("ul.container");
const ulFavoriteList = document.querySelector('ul.favoriteUl');
const categorySelect = document.querySelector('select#selectCategories');
let listOfEmojis;
let favoriteEmojis = [];
//fetch json data from url
function fetchEmojis(){
	fetch("https://raw.githubusercontent.com/amio/emoji.json/master/emoji.json")
	.then(response => response.json())
	.then(json => {
		listOfEmojis = json;
		loadingLocalstorage();
		console.log(listOfEmojis);
		getOptionTagForEachCategory();
		renderHTML(favoriteEmojis, ulFavoriteList);
		renderHTML(listOfEmojis);
	})
}
//renders lists of emojis in the specified ul
function renderHTML(listOfEmojis, ulList = ulTag){	
	ulList.innerHTML = "";
	listOfEmojis.forEach((emoji) => {
		const liTag = document.createElement("li");
		const emojiSpan = document.createElement("span");
		setTimeout(() => {
			emojiSpan.innerHTML = emoji.char
		}, 0);
		
		emojiSpan.classList.add("emoji");
		liTag.appendChild(emojiSpan);
		
		const nameSpan = document.createElement("span");
		setTimeout(() => {		
			nameSpan.innerHTML = emoji.name;
		}, 0);
		nameSpan.classList.add("emojiName");		
		liTag.appendChild(nameSpan);
			
		
		
		//save to clipboard
		liTag.addEventListener('click', () => {
			emojiClickEventHandler(emoji);
		})

		ulList.appendChild(liTag);
	})
}
//searches emoji based on the given search option
function searchEmoji(searchValue, searchOption){
    const newListOfEmojis = listOfEmojis.filter((emoji) => {
		return emoji[searchOption].toLowerCase().includes(searchValue.toLowerCase());
	});
	console.log(newListOfEmojis);
	renderHTML(newListOfEmojis);
	return newListOfEmojis;
}
//get category lists for the select list
function getCategoryLists(){
	let listsOfCategory = [];
	listOfEmojis.forEach(emoji => {
		const category = emoji.category.split('(')[0];
		if(!listsOfCategory.includes(category)){
			listsOfCategory.push(category);
		}
	});
	return listsOfCategory;
}
//get emoji lists based on the given category
function getEmojisByCategory(){
	let listOfEmojisPerCategory;
	if(categorySelect.value === 'all'){
		listOfEmojisPerCategory = listOfEmojis;
		renderHTML(listOfEmojisPerCategory);
	}else
		listOfEmojisPerCategory = searchEmoji(categorySelect.value, 'category');
	return listOfEmojisPerCategory;
}
//gives lists of tag to be displayed on the select list
function getOptionTagForEachCategory(){
	const categoryLists = getCategoryLists();
	categoryLists.forEach(category => {
		const optionCategory = document.createElement('option');
		optionCategory.innerHTML = category;
		categorySelect.appendChild(optionCategory);
	});
}
//event listener for the select object
categorySelect.addEventListener('change', () => {
	console.log(categorySelect.value);
	searchField.value = categorySelect.value;
	console.log(getEmojisByCategory());		
});
//add emoji to favoriteEmojis array 
function addToFavorite(emoji){
	favoriteEmojis.unshift(emoji);
	console.log(favoriteEmojis);
	favoriteEmojis = favoriteEmojis.filter((emoji, index) => {
		return favoriteEmojis.indexOf(emoji) == index;
	});
	//saving favoriteEmojis array to localstorage
	localStorage.setItem("favoriteEmojis", JSON.stringify(favoriteEmojis));
	renderHTML(favoriteEmojis, ulFavoriteList);
}
//emoji click event handler
function emojiClickEventHandler(emoji){
	writeToClipboard(emoji.char);
	addToFavorite(emoji);
}
//loading favorite list
function loadingLocalstorage(){	
	favoriteEmojis = JSON.parse(
        localStorage.getItem("favoriteEmojis") || "[]"
      );
}
//searchField  keyup event listener
searchField.addEventListener("keyup",() => searchEmoji(searchField.value,'name'));
//searchField focus event listener
searchField.addEventListener("focus",() => searchField.value = '');
fetchEmojis();
