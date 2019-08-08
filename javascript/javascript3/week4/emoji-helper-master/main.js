console.log("Script loaded");
const searchField = document.getElementById("searchField");
const ulTag = document.querySelector("ul.container");
const ulFavoriteList = document.querySelector('ul.favoriteUl');
const categorySelect = document.querySelector('select#selectCategories');
let listOfEmojis;
let favoriteEmojis = [];
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
function renderHTML(listOfEmojis, ulList = ulTag){	
	ulList.innerHTML = ""
	listOfEmojis.forEach((emoji) => {
		const liTag = document.createElement("li");
		const emojiSpan = document.createElement("span");
		emojiSpan.innerHTML = emoji.char
		emojiSpan.classList.add("emoji");
		liTag.appendChild(emojiSpan);

		const nameSpan = document.createElement("span");		
		nameSpan.innerHTML = emoji.name
		nameSpan.classList.add("emojiName");		
		liTag.appendChild(nameSpan);
		//save to clipboard
		liTag.addEventListener('click', () => {
			emojiClickEventHandler(emoji);
		})

		ulList.appendChild(liTag);
	})
}

function searchEmoji(searchValue, searchOption){
    const newListOfEmojis = listOfEmojis.filter((emoji) => {
		return emoji[searchOption].toLowerCase().includes(searchValue.toLowerCase());
	});
	console.log(newListOfEmojis);
	renderHTML(newListOfEmojis);
	return newListOfEmojis;
}
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
function getEmojisByCategory(){
	let listOfEmojisPerCategory;
	if(categorySelect.value === 'all')
		listOfEmojisPerCategory = listOfEmojis;
	else
		listOfEmojisPerCategory = searchEmoji(categorySelect.value, 'category');
	return listOfEmojisPerCategory;
}
function getOptionTagForEachCategory(){
	const categoryLists = getCategoryLists();
	categoryLists.forEach(category => {
		const optionCategory = document.createElement('option');
		optionCategory.innerHTML = category;
		categorySelect.appendChild(optionCategory);
	});
}
categorySelect.addEventListener('change', () => {
	console.log(categorySelect.value);
	searchField.value = categorySelect.value;
	console.log(getEmojisByCategory());		
});
function addToFavorite(emoji){
	favoriteEmojis.unshift(emoji);
	console.log(favoriteEmojis);
	favoriteEmojis = favoriteEmojis.filter((emoji, index) => {
		return favoriteEmojis.indexOf(emoji) == index;
	});

	localStorage.setItem("favoriteEmojis", JSON.stringify(favoriteEmojis));
	renderHTML(favoriteEmojis, ulFavoriteList);
}
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
searchField.addEventListener("keyup",() => searchEmoji(searchField.value,'name'));
searchField.addEventListener("focus",() => searchField.value = '');
fetchEmojis();
