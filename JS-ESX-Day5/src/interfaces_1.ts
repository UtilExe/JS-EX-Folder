/*
a) Create a TypeScript interface IBook, which should encapsulate information about a book, including:
title, author:  all strings
published: Date
pages: number 
*/
interface IBook {
    title:string,
    // e) Change the interface to make author readonly - Verify the new behaviour.
    // e INFO: readonly gør at man ikke kan ændre i attribut. Lidt samme tankegang som final i Java.
    readonly author:string,
    // d) Change the interface to make published and pages become optional - Verify the new behaviour.
    // d INFO: Et ? efter parameter resulterer i optional
    published?:Date,
    pages?:number
}

const ABook: IBook = {
  title: "Elon",
  author: "Elon Musk",
  //published: new Date(),
  pages: 245
}

// b) Create a function that takes an IBook instance and test it with an object instance.
function logger(book:IBook) {
  console.log(book)
}

logger(ABook)
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

class Book implements IBook {
    #title: string
    readonly #author: string
    #published: Date
    #pages: number

  constructor(
    title: string,
    author: string,
    published: Date,
    pages: number,
    ) {
      this.#title = title
      this.#author = author
      this.#published = published
      this.#pages = pages
    };
    public get title() {
      return this.#title;
    }
    public get author() {
      return this.#author
    }
    public get published() {
      return this.#published
    }
    public get pages() {
      return this.#pages
    }

    public set title(title: string) {
      this.#title = title;
    }
    public set published(published: Date) {
      this.#published = published;
    }
    public set pages(pages: number) {
      this.#pages = pages;
    }
    toString(): string {
      return this.#title + this.#author + this.#published + this.#pages;
    }
}

const bookTest = new Book('TestTitle', 'TestAuthor', new Date(), 23)
console.log(bookTest.toString())