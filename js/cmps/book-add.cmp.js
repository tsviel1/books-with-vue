import { bookService } from "../services/book-service.js";
import { eventBus } from '../services/eventBus-service.js';


export default {
    template: `
    <section class="book-add">
        <section class="search-input">
            <span>Add a book: </span>
            <input v-model="userInput" type="text">
            <button @click="onSearchBook">Search</button>
        </section>
        <section v-if="results" class="search-results">
            <ul>
                <li v-for="result in results">
                    <p>{{result.title}}</p>
                    <button @click="onAddBook(result)">+</button>
                </li>
            </ul>
        </section>
    </section>
`,
    data() {
        return {
            results: null,
            userInput: null,
        };
    },
    methods: {
        onSearchBook() {
            bookService.getResultsFromGoogle(this.userInput)
                .then(searchResults => {
                    console.log('searchResults', searchResults)
                    this.results = searchResults
                })
        },
        onAddBook(result) {
            if (!result.description) result.description = 'N/A'
            bookService.addBook(result)
                .then(book => {
                    this.$emit('bookAdded', book)
                    eventBus.emit('show-msg', { txt: 'book added' })
                })
        }
    },
};