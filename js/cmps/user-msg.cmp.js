import { eventBus } from "../services/eventBus-service.js";

export default {
    template: `
    <section v-if="msg" class="user-msg">
        <h3>User msg</h3>
        <p>{{msg.txt}}</p>
        <router-link to="/book">Back to books</router-link>
    </section>
`,
    data() {
        return {
            unsubscribe: null,
            msg: null
        };
    },
    created() { 
        this.unsubscribe = eventBus.on('show-msg', this.showMsg)
    },
    methods: {
        showMsg(msg) {
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 2000)
        }
    },
    unmounted() {
        this.unsubscribe()
    },
};