//Calculating the average/median of an array
/**
 * The "average" is sum up all the numbers
 * and then divide by the number of numbers. 
 */
const housePrices = [3000000, 3500000, 1300000, 40000000, 100000000, 8000000, 2100000];
function avarageMedian(num) {
    let total = 0;
    for (i = 0; i < num.length; i++) {
        total += num[i];
    }
    const avarage = (total / num.length);
    //The "median" is the "middle" value in the list of numbers  
    let median = 0, numsLen = num.length;
    num.sort();
    // is even
    if (numsLen % 2 === 0) { 
    
        // average of two middle num
        median = (num[numsLen / 2 + 1] + num[numsLen / 2]) / 2;
    } else { // is odd
        // middle number only
        median = num[(numsLen + 1) / 2];
    }      
    return {avarage,median};
}
alert("The array: [" + housePrices + "]" +
    "\nThe Meadian is: " + avarageMedian(housePrices).median + "\n The average of the given array is: "
 + avarageMedian(housePrices).avarage);
const h1 = document.createElement('h1');
h1.innerText = "The Avarage and the median of the array: ";
const par = document.querySelector('p');
par.innerText = '[' + housePrices + ']';
const para = document.createElement('p');
para.innerText = 'The median is: ' + avarageMedian(housePrices).median + '\n The avarage is: ' + avarageMedian(housePrices).avarage;
document.body.appendChild(h1);
document.body.appendChild(par);
document.body.appendChild(para);