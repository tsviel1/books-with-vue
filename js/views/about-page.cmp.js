import { eventBus } from "../services/eventBus-service.js";

export default {
    template: `
        <section class="app-main">
            <div class="about-page">
                <h3>About Miss Books</h3>
                <p>Miss Books was born in Jerusalem, Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores suscipit numquam molestiae odio facere dolorum voluptatem velit sint alias incidunt voluptates quo voluptatum soluta odit esse quibusdam vitae, earum aliquam.
                </p>
            </div>
            
            <button @click="callBus">Call the Bus</button>
        </section>
`,
    methods: {
        callBus() {
            console.log('calling the bus');
            eventBus.emit('show-msg', 'hi')
        }
    },
};