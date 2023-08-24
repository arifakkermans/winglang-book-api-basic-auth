import books from './books.json';

export function base64decode(str) {
  return Buffer.from(str, 'base64').toString('utf8');
}

export function base64encode(str) {
  return Buffer.from(str, 'utf8').toString('base64');
}

export async function getISBNFromPath (path) {
  return path.split('/')[path.split('/').length - 1]
}

export function getBooks() {
  return books;
}

export function getBookByISBN(isbn) {
  const book = books.find(book => book.isbn === isbn);
  console.log('book:', book);
  return book ? JSON.stringify(book, null, 2) : null;
}

export function bookExists(isbn) {
  console.log('isbn:', isbn);
  return Boolean(getBookByISBN(isbn));
}