const moviesApi = "https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/";
let badMovies = [];
let movies = [];
let badMoviesTitle = [];
fetch(moviesApi)
    .then(response => response.json())
    .then(json =>{
        console.log(json);
         badMovies = json.
        filter(obj => obj.rating < 4);
        return badMovies;
    })
    .then(result =>{
        console.log(result);
        movies = result.filter(obj => obj.year >= 2000);
        console.log(movies);
        return movies;
    })
    .then(result =>{
        console.log(result);
        badMoviesTitle = result.map(obj => obj.title);
        console.log(badMoviesTitle);
        return badMoviesTitle;
    })
    .then(result => console.log(result))
    .catch(err => console.log(err)); 
 
    //function used to display samples in list
const ul = document.querySelector("section.display > ul");
function sampleDisplay(movies){     
    clearList(ul);
    for(let i=0; i<10;i++){
        const li = document.createElement('li');
        li.innerHTML = movies[i].title;
        ul.appendChild(li);
    }  
}
function clearList(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
    function showSelectedValue(){
        const select = document.querySelector('select');
        const section = document.querySelector('section.display');
        const p = document.querySelector('p.display');
        select.addEventListener('change',function(){        
            if(select.value === "titleBadRatingMovies"){
                p.innerHTML = 'Sample of movies title with bad rating:' + badMoviesTitle.length;              
                sampleDisplay(badMoviesTitle);
            }else if(select.value === "givenYear"){
                p.innerHTML = 'Number of bad movies since year 2000:' + movies.length;
                sampleDisplay(movies);
            }else if(select.value === "badRating"){
                p.innerHTML = 'The number of Movies with Bad rating:' + badMovies.length;
                sampleDisplay(badMovies);
            }           
            select.value = 'none';
        });
    };
    showSelectedValue();
    