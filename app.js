import { ProjectsData, ModelsData } from "./data.js";
import { ProjectCard, ModelCard } from "./components.js";

const app = Vue.createApp({
    data() {
        return {
            brandName: 'Isaiah Richards',
            pageTitle: 'Isaiah Richards',
            welcomeMessage: 'Game Developer',
            activeSection: 'home',
            isManualScrolling: false,
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
            if (this.isManualScrolling) return;

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'home' && window.scrollY > 50) return;
                    const docHeight = document.documentElement.scrollHeight;
                    if (entry.target.id === 'contact' && window.scrollY + window.innerHeight < docHeight - 50) return;
                    this.activeSection = entry.target.id;
                }
            });
        },
        
        handleScroll() {
            if (this.isManualScrolling) return;

            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            if (scrollY < 50) {
                if (this.activeSection !== 'home') {
                    this.activeSection = 'home';
                }
                return; 
            } 

            if (this.activeSection === 'home') {
                this.activeSection = 'projects';
            }

            const isAtBottom = (scrollY + windowHeight >= docHeight - 50);

            if (isAtBottom) {
                if (this.activeSection !== 'contact') {
                    this.activeSection = 'contact';
                }
            } 
            else if (this.activeSection === 'contact') {
                this.activeSection = 'about';
            }
        },

        navigateTo(sectionId) {
            this.activeSection = sectionId;
            this.isManualScrolling = true;

            if (this.scrollTimeout) clearTimeout(this.scrollTimeout);

            this.scrollTimeout = setTimeout(() => {
                this.isManualScrolling = false;
            }, 1000);
        },
    },

    mounted() {
        this.observer = new IntersectionObserver(this.handleIntersection, this.observerOptions);
        document.querySelectorAll('main section[id]').forEach(section => {
            this.observer.observe(section);
        });

        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        if (this.observer) {
            document.querySelectorAll('main section[id]').forEach(section => {
                this.observer.unobserve(section);
            });
            this.observer.disconnect();
        }

        window.removeEventListener('scroll', this.handleScroll);
    }
});

app.config.compilerOptions.isCustomElement = tag => tag === 'model-viewer';

app.mount('#app');