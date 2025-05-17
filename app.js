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
            projects: [
                {
                    id: 1,
                    title: 'Final Fumes',
                    description: 'Feature complete atmospheric horror roguelike made with a team of 4.',
                    imageUrl: 'images/FinalFumesCover.png',
                    videoUrl: 'videos/FinalFumesTrailer.mp4',
                    link: 'https://isrichards6.itch.io/final-fumes',
                    technologies: ['C#', 'Unity', 'MagicaVoxel', 'Blender']
                },
                {
                    id: 2,
                    title: 'Dungeon Diner',
                    description: '2.5D cooking adventure prototype to show off a novel gameplay loop.',
                    imageUrl: 'images/DungeonDinerCover.png',
                    videoUrl: null,
                    link: 'https://isrichards6.itch.io/dungeon-diner',
                    technologies: ['C#', 'Unity', 'Aesprite']
                }
            ]
            // TODO: skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Bootstrap', 'C++', 'C#', 'Unity', 'Python']
        };
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
    },
});

app.component('project-card', {
    props: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        videoUrl: { type: String, default: null },
        link: { type: String, required: true },
        technologies: { type: Array, default: () => [] }
    },
    template: `
        <div class="col-md-6 col-lg-4 mb-4 d-flex">
            <div class="card h-100 w-100 shadow-sm">
                <template v-if="videoUrl">
                    <video class="card-img-top" :poster="imageUrl" autoplay loop muted playsinline controls>
                        <source :src="videoUrl" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </template>
                <template v-else>
                    <a :href="link" target="_blank" rel="noopener noreferrer">
                        <img :src="imageUrl" class="card-img-top" :alt="title + ' project image'">
                    </a>
                </template>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">
                        <a :href="link" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-dark">{{ title }}</a>
                    </h5>
                    <p class="card-text">{{ description }}</p>
                    <div class="mt-auto pt-2">
                        <p class="card-text mb-2"><small class="text-muted">Technologies: {{ technologies.join(', ') }}</small></p>
                        <a :href="link" class="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">View Project</a>
                    </div>
                </div>
            </div>
        </div>
    `
});

app.mount('#app');