/*
Read about this in JavaScript and implement at least three examples to illustrate how this in JavaScript differs from what we know from Java. 
One of the examples should include an example of explicit setting this using either call(), apply() or bind().
*/

// Se noter, se Lars' video. Læs beskrivelsen. Se generelt om this i JS og vend tilbage. 


// se evt. https://stackoverflow.com/questions/20737191/how-is-the-this-keyword-of-javascript-is-different-from-this-keyword-of-java/20737471 + artikel på stackoverflow svar.

// Et eksempel på generelt brug af this. Helt almindeligt og som vi kender det fra Java. Derfor ikke et forskelseksempel men blot generelt this brug som vi kender det, dog med brug af Constructor. 
// Et objekt kaldet car1, som bliver referencen til this når vi kalder den på L25.
function Car(make, model) {
    this.make = make;
    this.model = model;
    this.showThis = function () {
        console.log("this. normal Java behavior:", this);
    };
    this.show = function () {
        console.log("this. normal Java behavior:", `${this.make}, ${this.model}`);
    };
}

const car1 = new Car("Volvo", "V70");
car1.show();

// Et eksempel på hvordan JS er anderledes end hvad vi kender fra Java:
function CarDifference(make, model) {
    this.make = make;
    this.model = model;
    this.showThis = function () {
        console.log(this);
    };
    this.show = function () {
        console.log(`${this.make}, ${this.model}`);
    };

    // Kører asynkront nedenfor. Her er det væsentlige. Normalt ville man regne med, at this peger på det objekt den lever i. (Som i vores tilfælde er L47, vores carDifference1.showAsync(); kald.). 
    // Dog ikke tilfældet her som man ville tro det kørte i Java.
    // this peger ikke på noget.

    // Output er: undefined undefined.
    this.showAsyncUndefined = function () {

        setTimeout(function () {
            console.log("this undefined solution:", this.make + ", " + this.model); // Output: undefined, undefined
        }, 0);
    };

    // Eksempel på hvordan man kan få this til at pege på noget:
    this.showAsyncOldSolutionButWorks = function () {
        // Gamle løsning før ES6 - før vi laver det asynkrone kald, laver vi en reference til den this som vi gerne vil arbejde på og have fat på:
        const self = this; 
        setTimeout(function () {
            console.log("this working but old solution:", self.make + ", " + self.model);
        }, 0);
    };

    // Eksempel på hvordan man kan få this til at pege på noget:
    this.showAsyncNewSolutionAndWorks = function () {
        // NY LØSNING, efter ES6 - arrow funktioner. Der er nemlig en anderledes opførsel af this på arrow funktioner.
        setTimeout(() => {
            console.log("this working and new solution:", this.make + ", " + this.model);
        }, 0);
    };
}

const carDifference1 = new CarDifference("WW", "Golf");
carDifference1.showAsyncUndefined(); // Den vil give 
carDifference1.showAsyncOldSolutionButWorks();
carDifference1.showAsyncNewSolutionAndWorks();

// Eksempel på andet eksempel + bind eksplicit
let person = {
    name: 'John Doe',
    getName: function() {
        console.log(this.name);
    }
};
// Eksempel der ikke virker. Output: Undefined.
setTimeout(person.getName, 0); // undefined

// Eksempel der virker, via brug af anonymous funktion. Virker fordi den får person fra et ydre scope og derefter kalder metoden getName(). Output: Korrekt. Dog ikke via Bind.
setTimeout(function () {
    person.getName();
}, 0);

// Eksempel der virker, via brug af BIND!:
let f = person.getName.bind(person);
setTimeout(f, 0);


/*
Explain to each other, using the examples (as if it was the exam):
How this in JavaScript differ from this in Java
Why we (because we did not explain about this) followed a pattern in our third semester controller and stored a reference to this (var self = this)
The purpose of the methods call(), apply() and bind()
*/

/* 
Tekst-svar:
SPØRGSMÅL 1.: How this in JavaScript differ from this in Java?
SVAR: 
-I (Java)) referer this altid til den nuværende instans af objektet som laver et kald. F.eks. carDifference1.showAsyncUndefined(); 
Dvs. at hvis e funktion er kaldet med et punktum foran, er det objektet før punktummer, der er this og bliver refereret til.
- I Javascript er det nogle gange som ovenstående. 
Men der er også tilfælde, hvor this ikke peger på noget. F.eks. i det asynkrone kald setTimeout. (Se eksempel på show asynkrone metoder længere oppe).
Derudover, hvis man bruger this. i en funktion, referer this til et globalt objekt (som vist typisk er Browser window objektet)

SPØRGSMÅL 2.: Why we (because we did not explain about this) followed a pattern in our third semester controller and stored a reference to this (var self = this)
SVAR:
- Det bruges til at kunne reference til det oprindelige this, hvis f.eks. en context ændres. Se ekempel på L53. (const self = this;). 
Bliver anvendt fordi,at vores asynkrone timeOut metode ændrer context, og for at kunne opretholde referencen til vores oprindelige this, gemmer vi det sådan.

SPØRGSMÅL 3.: The purpose of the methods call(), apply() and bind()
SVAR: 
Via. bind kan vi fortælle hvilken this, som der skal bruges. 
*/