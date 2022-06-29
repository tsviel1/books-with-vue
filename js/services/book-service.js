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
    removeReview,
    getResultsFromGoogle,
    addBook,
    getNextBookId
};

function query() {
    return storageService.query(BOOKS_KEY)
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
}

function getResultsFromGoogle(txt) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`)
    .then(res => {
        return _prepareData(res.data)
    })
}

function _prepareData(data){
    return data.items.map(item=>{
        const info = item.volumeInfo
        return {
            id: item.id,
            title: info.title,
            subtitle: info.subtitle,
            authors: info.authors,
            publishedDate: info.publishedDate,
            description: info.description,
            pageCount: info.pageCount,
            categories: info.categories,
            thumbnail: info.imageLinks.thumbnail,
            language: info.language,
            listPrice: {
                amount: 100,
                currencyCode: 'EUR',
                isOnSale: false
            },
        }
    })
}


function addBook(book) {
    return storageService.post(BOOKS_KEY, book)
}

function getNextBookId(bookId) {
    return storageService.query(BOOKS_KEY)
    .then(books => {
        const idx = books.findIndex(book => book.id === bookId)
        return (idx < books.length-1)? books[idx + 1].id : books[0].id
    })
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