import { ProjectsData, ModelsData } from "./data.js";
import { ProjectCard, ModelCard } from "./components.js";

const app = Vue.createApp({
    data() {
        return {
            brandName: 'Isaiah Richards',
            pageTitle: 'Welcome to My Portfolio!',
            welcomeMessage: 'Check out my work below.',
            activeSection: 'home',
            observer: null,
            observerOptions: {
                root: null,
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0
            },
            projects: ProjectsData,
            models: ModelsData,
        };
    },
    components: {
        'project-card': ProjectCard,
        'model-viewer-card': ModelCard
    },
    methods: {
        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.activeSection = entry.target.id;
                }
            });
        }
    },
    mounted() {
        this.observer = new IntersectionObserver(this.handleIntersection, this.observerOptions);
        document.querySelectorAll('main section[id]').forEach(section => {
            this.observer.observe(section);
        });
    },
    beforeUnmount() {
        if (this.observer) {
            document.querySelectorAll('main section[id]').forEach(section => {
                this.observer.unobserve(section);
            });
            this.observer.disconnect();
        }
    }
});


app.config.compilerOptions.isCustomElement = tag => tag === 'model-viewer';

app.mount('#app');