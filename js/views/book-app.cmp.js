import { bookService } from "../services/book-service.js";
import bookList from "../cmps/book-list.cmp.js";
import bookAdd from "../cmps/book-add.cmp.js";
import bookDetails from "../views/book-details.cmp.js";
import bookFilter from "../cmps/book-filter-cmp.js";


export default {
    template: `
    <section class="book-app">
        <h1>Books:</h1>
        <book-filter @filtered="onFilterBook"/>
        <book-add @bookAdded="addBook"/>
        <book-list @selected="onSelectBook" :books="booksToDisplay" />
    </section>
`,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null,
        };
    },
    created() {
        bookService.query().then(books => this.books = books)
    },
    methods: {
        onFilterBook(filterBy) {
            this.filterBy = filterBy
        },
        onSelectBook(book) {
            this.selectedBook = book
        },
        onCloseDetails() {
            this.selectedBook = null
        },
        addBook(book) {
            bookService.query()
                .then(books => this.books = books)
        }
    },
    computed: {
        booksToDisplay() {
            if (!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.title, "i");
            return this.books.filter((book) => regex.test(book.title) && book.listPrice.amount <= this.filterBy.toPrice && book.listPrice.amount >= this.filterBy.fromPrice);
        }
    },
    components: {
        bookList,
        bookDetails,
        bookFilter,
        bookAdd
    }
};