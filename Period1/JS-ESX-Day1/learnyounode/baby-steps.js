
/* Since its documented that the 3rd element contains the value, we are going to use that)
*/ 
var index = 2;
var sum = 0;

while(process.argv[index]) {
    sum = (+sum) + (+process.argv[index]) // process.argv reads from our terminal. The + infront of the variable sums them. Could also have used Number hook.
    index++;
}

console.log(sum);