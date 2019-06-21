//Doubles the odd numbers in an array and throws away the even number
//numbers are declared to be used doen in the formula
let numbers = [1, 2, 3, 4];
let output = 'The given array: ['
const par = document.querySelector('p.array');
par.innerHTML = output + numbers + ']'
//newNumbers are empty array to be populate double of odd numbers in numbers array
let newNumbers = [];
//filter is used with anonemous function to to filter the odd numbers from numbers array
newNumbers = numbers.filter(num => {
    if(num%2===0){
        return false;
    }else{
        return true;
    }
});
output = 'The array after filtering only odds: ['
const para1 = document.querySelector('p.para1');
para1.innerHTML = output + newNumbers + ']';
newNumbers = newNumbers.map(num => num*2);
output = 'The array after filtering only odds and doubling: ['
const para2 = document.querySelector('p.para2');
para2.innerHTML = output + newNumbers +']';
