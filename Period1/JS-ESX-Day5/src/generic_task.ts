// Generics
// a) Implement a generic function which will take an array of any kind, and return the array reversed (just use the built-in reverse function), 
// so the three first calls below will print the reversed array, and the last call will fail.


function reverseArr<T>(arg: T[]) {
    return (arg.reverse())
}

console.log(reverseArr<string>(["a","b","c"]));
console.log(reverseArr<number>([1,2,3]));
console.log(reverseArr<boolean>([true,true,false]));

// this one will fail (intended due to wrong type input)
//console.log(reverseArr<number>(["a","b","c"]));


// b) Implement a generic Class DataHolder that will allow us to create instances
console.log("***Exercise B: ***")
class DataHolder <T> {
    #value: T
    constructor(
        value: T,
    ) {
        this.#value = value
    };
    // c) user getters and setters instead of the silly getXX and setXX methods:
    public get value(): T {
        return this.#value;
    }
    public set value(value: T) {
        this.#value = value;
    }
}

let d = new DataHolder<string>("Hello");
console.log(d.value);
d.value = "world";
console.log(d.value);

let d2 = new DataHolder<number>(123);
console.log(d2.value);
d2.value = 500;
console.log(d2.value);
// Task: Verify that once created, an instance can only be used with the type it was created from.
// Type 'string' is not assignable to type 'number'
// d2.value = "Hello";