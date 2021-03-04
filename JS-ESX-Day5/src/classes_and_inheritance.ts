// A) The declaration below defines a Shape class, which as it's only properties has a color field
// + a getArea() and a getPerimeter() function which both returns undefined. This is the closest we get to an abstract method in Java.

abstract class Shape {
    private _color: string;
    constructor(color: string) {
        this._color = color;
    }
    abstract get area(): number;
    abstract get perimeter(): number;

    get color(): string {
        return this._color;
    }
    set color(color: string) {
        this._color = color
    }
    toString(): string { return `${this._color}` }
}

// Note: cannot make instance of class (Shape) due to it being Abstract.

/*
B) Create a new class Circle that should extend the Shape class.
Provide the class with:
A radius field
A constructor that takes both colour and radius.
Overwritten versions of the methods defined in the Base
Getter/Setter for radius
*/

class Circle extends Shape {
    private _radius: number;
    constructor(
        color: string,
        radius: number
    ) {
        super(color)
        this._radius = radius;
    };

    get radius(): number {
        return this._radius;
    }
    set radius(radius: number) {
        this._radius = radius
    }

    // overriden methods:
    // the math formulars for calculating area and perimeter are taken from: https://www.w3resource.com/javascript-exercises/javascript-object-exercise-9.php
    get area(): number {
        return Math.PI * this._radius * this._radius
    }
    get perimeter(): number {
        return 2*Math.PI*this._radius
    }
}

// Test the class constructor, the getters/setters and the three methods.
/*let circle1 = new Circle('Blue', 3)
console.log(circle1.area)
console.log(circle1.perimeter)
console.log(circle1.color)
console.log(circle1.radius)
circle1.color = 'Green'
console.log(circle1.toString())
*/


// C) Create a new class Cylinder (agreed, definitely not a perfect inheritance example) that should extend the Circle class.
/*
Provide the class with:
A height field
A constructor that takes colour, radius and height.
Overwritten versions of relevant methods defined in the Base (getter for perimeter should throw "not implemented")
A getVolume() method  (or better, a getter called volume)
Getter/Setter for height
*/
class Cylinder extends Circle {
    private _height: number
    constructor(
        color: string,
        radius: number,
        height: number,
    ) {
        super(color, radius)
        this._height = height;
    };

    get perimeter(): number {
        throw new Error('Not implemented')
    }

    // math formular for the cylinder area is taken from: https://www.nextptr.com/question/a651306342/the-surface-area-of-a-cylinder 
    get area(): number {
        return 2 * Math.PI * this.radius * this._height + 2 * Math.PI * this.radius * this.radius; 
    }

    // math formular for the cylinder volume is taken from: https://www.w3resource.com/javascript-exercises/javascript-object-exercise-5.php
    get volume(): number {
        return this._height * Math.PI * this.radius * this.radius;
    }

    get height(): number {
        return this._height;
    }
    set height(height: number) {
        this._height = height
    }

    public toString():string{return `Color is: ${this.color}, Radius is: ${this.radius} and Height is: ${this._height}`}
}

// Task: Test the new class
let cylinder1 = new Cylinder('Blue', 2, 7);
console.log(cylinder1.area)
// throwing exception (feature, not a bug): console.log(cylinder1.perimeter)
console.log(cylinder1.volume)
console.log(cylinder1.height)
cylinder1.height = 6
console.log(cylinder1.height)
console.log(cylinder1.toString())