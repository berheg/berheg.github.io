const danishWords = ['bil', 'plante', 'kaffe', 'bog', 'ø', 'planetarium'];
function getShortestWord(str){  
  let result = str[0];

  for(let i = 1 ; i < str.length ; i++)
  {
    if(result.length > str[i].length)
    {
    result = str[i];
    } 
  };
  return result;
};
const h1 = document.createElement('h1');
const par = document.createElement('p');
h1.innerText = "The given array of Words: ";
par.innerText = '[' + danishWords + ']';
document.body.appendChild(h1);
document.body.appendChild(par);
const para = document.createElement('p');
const h2 = document.createElement('h2');
h2.innerText = "The Shortes Word is: ";
para.innerText = getShortestWord(danishWords);
document.body.appendChild(h2);
document.body.appendChild(para);