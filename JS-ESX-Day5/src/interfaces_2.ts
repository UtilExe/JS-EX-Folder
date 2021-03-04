// a) Create an interface to describe a function: myFunc that should take three string parameters and return a String Array.
interface myFunc {
    (str1: string,
    str2: string,
    str3: string): string[]
}

// b) Design a function "implementing" this interface which returns an array with the three strings
let stringsToArr:myFunc = function(str1:string, str2:string, str3:string) {
    let arrResult = [str1, str2, str3]
    return arrResult;
}

console.log(stringsToArr('test', 'test2', 'test3'))

// c) Design another implementation that returns an array, with the three strings uppercased.
let stringsToUpperArr:myFunc = function(str1:string, str2:string, str3:string) {
    let arrayData = [str1, str2, str3]
    arrayData = arrayData.map((element:string) => {
        return element.toUpperCase();
    })
    return arrayData;
}

console.log(stringsToUpperArr('test', 'test2', 'test3'))

// d) The function, given below, uses the ES-6 (and TypeScript) feature for destructuring Arrays into individual variables, to simulate a method that uses the interface.
let f2 = function logger(f1: myFunc){
    //Simulate that we get data from somewhere and uses the provided function
    let [ a, b, c] = ["A", "B", "C"];
    console.log(f1(a,b,c));
}
// e) Test f2 with the two implementations created in b+c.
f2(stringsToArr)
f2(stringsToUpperArr)

// f) Verify that f2 cannot be used with functions that do not obey the myFunc interface
let failedTest = function(int1:number, int2:number, int3:number): any[] {
    return [int1, int2, int3]
}
/*  Types of parameters 'int1' and 'str1' are incompatible.
Type 'string' is not assignable to type 'number'. */
// f2(failedTest)