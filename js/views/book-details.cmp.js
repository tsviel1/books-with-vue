import bookDesc from "../views/book-desc.js"
import reviewAdd from "../views/review-add.js"
import { bookService } from "../services/book-service.js";

export default {
    template: `
    <section v-if="book" class="book-details" :class="{pricey: highPrice, cheap: lowPrice}">
        <button class="close">
            <router-link to="/book">Back</router-link>
        </button>
        <h4>Book Details</h4>
        <div class="all-details">
            <img class="book-img" :src="bookImgUrl" alt="">
            <div class="text-datails">
                <img class="sale-img" v-if="isOnSale" :src="saleImgUrl" alt="">
                <ul>
                    <li>id: {{book.id}}</li>
                    <li>Title: {{book.title}}</li>
                    <li>Subtitle: {{book.subtitle}}</li>
                    <li>Authors:
                        <ul>
                            <li v-for="author in book.authors">
                            {{author}}
                            </li>
                        </ul>
                    </li>
                    <li>Published Date: {{book.publishedDate}}</li>
                    <li>Description: <span v-if="isShort">{{book.description}}</span><book-desc v-else :desc="book.description"/>
                    </li>
                    <li>Page Count: {{book.pageCount}}</li>
                    <li>Categories:
                        <ul>
                            <li v-for="category in book.categories">
                            {{category}}
                            </li>
                        </ul>
                    </li>
                <li>Language: {{book.language}}</li>
                <li>Price: {{currencyIcon}}{{book.listPrice.amount}}</li> 
                <li v-if="readingKind">Reading Kind: {{readingKind}}</li> 
                <li v-if="bookAge">{{bookAge}}</li> 
                </ul>
            </div>
        </div>
    </section>
    <router-link :to="'/book/' + nextBookId">Next Book</router-link>
    <review-add/>
`,
    data() {
        return {
            saleImgUrl: '/imgs/sale.png',
            book: null,
            nextBookId: null
        };
    },
    computed: {
        bookImgUrl() {
            return this.book.thumbnail
        },
        currencyIcon() {
            if (this.book.listPrice.currencyCode === 'ILS') {
                return '₪'
            } else if (this.book.listPrice.currencyCode === 'EUR') {
                return '€'
            } else {
                return '$'
            }
        },
        readingKind() {
            if (this.book.pageCount > 500) return 'Long Reading'
            else if (this.book.pageCount > 200) return 'Decent Reading'
            else if (this.book.pageCount < 100) return 'Light Reading'
        },
        bookAge() {
            if (!this.book.publishedDate) return
            if (this.book.publishedDate < 2012) return 'Veteran Book'
            else if (this.book.publishedDate > 2021) return 'New!'
        },
        highPrice() {
            if (this.book.listPrice.amount > 150) return 'pricey'
        },
        lowPrice() {
            if (this.book.listPrice.amount < 20) return 'cheap'
        },
        isOnSale() {
            if (this.book.listPrice.isOnSale) return true
        },
        isShort() {
            if (this.book.description.length < 100) return true
        },
    },
    components: {
        bookDesc,
        reviewAdd
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                const id = this.$route.params.bookId
                bookService.get(id)
                    .then(book => {
                        console.log('book', book)
                        this.book = book
                        bookService.getNextBookId(book.id)
                            .then(nextBookId => this.nextBookId = nextBookId)
                    })
            },
            immediate: true
        },
    }

}