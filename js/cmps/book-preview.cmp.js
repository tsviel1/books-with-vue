export default {
    template: `
    <section class="book-preview">
        <p class="book-title">{{book.title}}</p>
        <img class="card-img" :src="bookImgUrl" alt="">
        <p>Price: {{currencyIcon}}{{book.listPrice.amount}}</p>
    </section>

`,
    data() {
        return {};
    },
    props: ["book"],
    computed: {
        currencyIcon() {
            if (this.book.listPrice.currencyCode === 'ILS') {
                return '₪'
            } else if (this.book.listPrice.currencyCode === 'EUR') {
                return '€'
            } else {
                return '$'
            }
        },

        // return new Intl.NumberFormat('en-EN', {
        //     style: 'currency',
        //     currency: this.book.listPrice.currencyCode
        // })
        bookImgUrl() {
            return this.book.thumbnail
        },
    }
};