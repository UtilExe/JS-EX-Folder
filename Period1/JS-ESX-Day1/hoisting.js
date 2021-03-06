/*
Implement at least two examples to illustrate that:
Function declarations are completely hoisted
var declarations are also hoisted, but not assignments made with them
*/

// Below shows that var declarations are also hostied, but not assignments with them:
function hoisting() {
    // It counts like randomObject was declared like this (but not instantiated with data): 
    /* var randomObject; */
    // And because of that handling from the hoisting behavior, the program will not crash. randomObject will just be undefined because it's declared but not instantiated, but no compile error.

    console.log("Value is.." + randomObject)

    if (!randomObject) {
        var randomObject = { value: "I'm random" }; // With var, we DONT have block scope (due to hoisting). With let we DO have block scope.
        console.log(randomObject.value)
    }
}

hoisting();

// Below shows function declarations are completely hoisted:
function hoisting2() {
    f1();
//    f2(); // Disabled to prevent errors. When it gets called here, f2 is not instantiated to a function. it's just a declaration called var f2;  and therefore, it will give error.

    // function always get lifted up, meaning it WILL NOT give errors.
    function f1() {
        console.log("I'm f1");
    }

    // Only the declaration gets lifted p (hoisting), meaning just var f2;
    // Meaning it can see f2, but when it's triggered it gives compile error, because it's not being instantiated yet.
    // only var f2; gets lifted up, not the function instantiation, so it WILL GIVE errors.
    var f2 = function() {
        console.log("Yes, but Im' f2");
    };
}

hoisting2();

/* ** EXPLAIN what hoisting is: **
Hoisting betyder at løfte op. Når man laver en var variabel bliver den hoistet (løftet) op. Betyder derfor der IKKE er block scope.
Bemærk: Kun deklæreringen vil løftes op, og dermed ikke instans værdien, så derfor vil den være undefined hvis den bliver kaldt inden da (men ikke crashe). 
Det gælder kun for var og vist også const. Gælder IKKE for let, der har vi block scope.
*/