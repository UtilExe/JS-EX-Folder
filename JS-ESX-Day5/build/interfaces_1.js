"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _title, _author, _published, _pages;
const ABook = {
    title: "Elon",
    author: "Elon Musk",
    //published: new Date(),
    pages: 245
};
// b) Create a function that takes an IBook instance and test it with an object instance.
function logger(book) {
    console.log(book);
}
logger(ABook);
// e) :
//ABook.author = "New"
/*
c) Given the example above, explain what is meant by the term Duck Typing, when TypeScript interfaces are discussed.:

Duck Typing is a method to check type compatibility for complex variable types. TypeScript uses duck-typing method to compare one object with other object,
and checks if the objects have the same type matching names or not.

TLDR:
It must be of the same type. Eg when instantiating, the property types must match the ones declared in the IBook interface.
*/
// f) Create a class Book and demonstrate the "Java way" of implementing an interface.
class Book {
    constructor(title, author, published, pages) {
        _title.set(this, void 0);
        _author.set(this, void 0);
        _published.set(this, void 0);
        _pages.set(this, void 0);
        __classPrivateFieldSet(this, _title, title);
        __classPrivateFieldSet(this, _author, author);
        __classPrivateFieldSet(this, _published, published);
        __classPrivateFieldSet(this, _pages, pages);
    }
    ;
    get title() {
        return __classPrivateFieldGet(this, _title);
    }
    get author() {
        return __classPrivateFieldGet(this, _author);
    }
    get published() {
        return __classPrivateFieldGet(this, _published);
    }
    get pages() {
        return __classPrivateFieldGet(this, _pages);
    }
    set title(title) {
        __classPrivateFieldSet(this, _title, title);
    }
    set published(published) {
        __classPrivateFieldSet(this, _published, published);
    }
    set pages(pages) {
        __classPrivateFieldSet(this, _pages, pages);
    }
    toString() {
        return __classPrivateFieldGet(this, _title) + __classPrivateFieldGet(this, _author) + __classPrivateFieldGet(this, _published) + __classPrivateFieldGet(this, _pages);
    }
}
_title = new WeakMap(), _author = new WeakMap(), _published = new WeakMap(), _pages = new WeakMap();
const bookTest = new Book('TestTitle', 'TestAuthor', new Date(), 23);
console.log(bookTest.toString());
//# sourceMappingURL=interfaces_1.js.map