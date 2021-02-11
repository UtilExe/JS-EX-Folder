console.log("Before Loop")
// var i; (svarer til dette pga hoisting)
/* Problem: 
1. var bliver hoistet op, så den i princippet ovenfor har var i = 0 defineret på forhånd. 
2. setTimeOut kører asynkront og uafhængigt af første del af for loop. Derfor er L7 allerede kørt flere gange og conditionen er ikke længere aktuel,
og man rammer derfor aldrig ind i console.loggen i setTimeout arrow funktionen. 
En 
*/
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(`Value of i: ${i}`)
    }, 0)
}

// LØSNING:
// Mon ikke vi gør brug af closures for at løse? Tænker ift. variablen 'i' som stadig lever efter funktionen har kørt, og vi derfor stadig har kendskab til den. 
function doSetTimeout(i) {
    setTimeout(() => {
        console.log(`New value of i: ${i}`)
    }, 0)
}
for (var i = 0; i < 3; i++) {
    doSetTimeout(i)
}

// Anden løsning kunne være at have brugt let, for at undgå hoisting.


/* Generelt Closure eksempel (ikke med i opgaverne for day1, blot til ekstra info for mig selv):
Bemærk hvordan variablen Mozilla stadig lever, til trods for at makeFunc() returneres efter kaldet i L39. 
Det skyldes Closures, da den funktion der bliver returneret, returneres samen med det miljø den levede i.
Og det miljø den levede i, havde kendskab til variablen (name), og derfor kan den fortsat bruges. */
function makeFunc() {
    var fieldName = "Mozilla";

    function logName() {
        console.log(fieldName)
    }
    return logName;
}

var f = makeFunc();
f();

/*
2) Implement a reusable function using the closure feature, that should encapsulate information about a person (name, and age) and returns an object with the following methods:
setAge
setName
getInfo (should return a string like Peter, 45)
*/
// Not fully sure if this is the right way to do it, or if I should have used this instead, and written setName, setAge etc outside of the data function.
function person() {

    var personData = {
        age: 0,
        name: "",
         // ES6 (arrow functions). Could also have used inner functions, eg. setAge: function(ageData) {
        setAge: ((ageData) => { // Using closure down below (age) I suppose? Using our outer variable, in our inner variable
            this.age = ageData;
        }),
        setName: ((nameData) => { // Using closure down below (name) I suppose? Using our outer variable, in our inner variable
            this.name = nameData;
        }),
        getInfo: (() => { // Using closure down below (name and age) I suppose? Using our outer variable, in our inner variable
            return console.log("Name: " + this.name + ", Age: " + this.age);
        })
    };

    return personData;
}

/* Outside of the function, probably wrong. trying to handle it like above instead..
function setName(n) {
    var name = n;
    return name;
}

function setAge(a) {
    var age = a;
    return age;
}*/

var personObjectData = person();
personObjectData.setAge(18)
personObjectData.setName("Alfred")
personObjectData.getInfo();
// Status: It works, but he question is whether it's as Lars wants it. Do we make use of the closure feature? Dvs. spørgsmålet er om funktionen bliver returneret med det miljø den havde.

/*
// Using Constructor...
function Person(name, age) {
    this.name = name;
    this.age = age;

    this.getName = function() {
      return this.name;
    };
  
    this.getAge = function() {
      return this.age;
    };

    this.getInfo = function() {
        return ("Name: " + name + ", Age: " + age);
    }
  }

  const tryData = new Person("Hans", 18);
  console.log("Second: " + tryData.getInfo());
  */