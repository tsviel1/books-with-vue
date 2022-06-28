import bookPreview from "./book-preview.cmp.js";

export default {
    template: `
 <section class="book-list">
    <ul>
        <li v-for="(book, idx) in books" :key="book.id" class="book-preview-container">
            <book-preview :book="book"/>
            <button>
                <router-link :to="'/book/'+book.id">Details</router-link>
            </button> 
        </li>
    </ul>
 </section>
`,
    props: ["books"],
    methods: {
        select(book) {
            this.$emit("selected", book)
        }
    },
    components: {
        bookPreview,
      },
};