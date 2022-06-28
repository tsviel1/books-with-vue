export default {
    template: `
    <section class="book-filter">
        <input type="text" v-model="filterBy.title" placeholder="find a book..." @input="filter">
        <span>Price from:</span>
        <input type="range" @change="filter" :title="filterBy.fromPrice" max="500" v-model="filterBy.fromPrice">
        <span class="num">{{filterBy.fromPrice}}</span>
        <span>To:</span>
        <input type="range" @change="filter" :title="filterBy.toPrice" max="300" v-model="filterBy.toPrice"><span class="num">{{filterBy.toPrice}}</span>
    </section>
`,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: 0,
                toPrice: 300
            }
        };
    },
    methods: {
        filter() {
            this.$emit("filtered", this.filterBy);
        },
    },
};