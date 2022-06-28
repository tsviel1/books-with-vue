export default {
    template: `
    <section class="book-desc">
        <span>{{only100}}</span>
        <button v-if="dontShowMore" @click="showMore">Read more...</button>
        <span v-else>{{restOfText}} <button @click="showLess">Read Less</button> </span>
    </section>
`,
    props: ["desc"],
    data() {
        return {
            dontShowMore: true
        };
    },
    created() { },
    methods: {
        showMore() {
            this.dontShowMore = false
        },
        showLess() {
            this.dontShowMore = true
        }
    },
    computed: {
        only100() {
            return this.desc.slice(0, 100)
        },
        restOfText() {
            return this.desc.slice(100)
        }
    },
    unmounted() { },
    components: {}
};