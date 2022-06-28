import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/eventBus-service.js";

export default {
    template: `
 <section class="reviews">
    <h2>Reviews</h2>
    <form @submit.prevent="add">
        <table>
            <tr>
                <td>Name:</td>
                <td>
                    <input ref="input" type="text" v-model="review.name"/>
                </td>
            </tr>
            <tr>
                <td>Rating:</td>
                <td>
                <select v-model="review.rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </td>
            </tr>
            <tr>
                <td>Read At:</td>
                <td>
                    <input type="date" v-model="review.readingDate" required/>
                </td>
            </tr>
            <tr>
                <td>More thoughts:</td>
                <td>
                <textarea v-model="review.thoughts" placeholder="add multiple lines"></textarea>
                </td>
            </tr>
        </table>
        <input type="submit" value="Submit" />    
    </form>
</section>
<section v-if="book" class="reviews-list">
    <h3>Book Reviews</h3>
    <ul v-if="book.reviews">
        <li v-for="review in book.reviews">
            <button @click="remove(review.id)">X</button>
            <pre>{{review}}</pre>
        </li>
    </ul>
</section>
`,
    data() {
        return {
            book: null,
            review: {
                name: 'Books Reader',
                rating: 1,
                readingDate: null,
                thoughts: ''
            }
        };
    },
    computed: {
        getToday() {
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            return date
        }
    },
    mounted() {
        this.$refs.input.focus()
    },
    methods: {
        add() {
            bookService.addReview(this.book.id, this.review)
                .then(book => {
                    this.book = book;
                    this.review = bookService.getEmptyReview()
                    eventBus.emit('show-msg', {txt: `A review on ${this.book.id} was added`})
                })
        },
        remove(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then(book => this.book =  book);
                eventBus.emit('show-msg', {txt: 'review removed'})
        }
    },
    created() {
        const {bookId} = this.$route.params
        bookService.get(bookId)
            .then(book => this.book = book)
    }
};