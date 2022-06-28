import { utilService } from './util-service.js';
import { theBooks } from "../services/books-array.js";
import { storageService } from './async-storage-service.js';

const BOOKS_KEY = 'books';
_createBooks();

export const bookService = {
    query,
    get,
    addReview,
    getEmptyReview,
    removeReview
};

function query() {
    return storageService.query(BOOKS_KEY)
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
}

function removeReview(bookId, reviewId) {
    return get(bookId)
        .then(book => {
            const idx = book.reviews.findIndex(review => review.id = reviewId)
            book.reviews.splice(idx, 1)
            return storageService.put(BOOKS_KEY, book)
        })
}

function addReview(bookId, review) {
    review.id = utilService.makeId()
    return get(bookId)
        .then(book => {
            if (!book.reviews) book.reviews = []
            book.reviews.push(review)
            return storageService.put(BOOKS_KEY, book)
        })
}

function getEmptyReview() {
    return {
        name: 'Book Reader',
        rating: 1,
        readingDate: null,
        thoughts: ''
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY);
    if (!books || !books.length) {
        books = theBooks.getTheBooks();
        utilService.saveToStorage(BOOKS_KEY, books);
    }
    return books;
}