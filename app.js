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
                    title: 'Aether Break',
                    description: 'First person platformer made by studio of over 20 people. I was in lead of UI implementation, working closely with art team. Additionally developed save system and worked on controller compatability.',
                    imageUrl: 'images/aether.png',
                    link: 'https://wolverinesoft-studio.itch.io/aetherbreak',
                    technologies: ['C#', 'Unity', 'Figma']
                },
                {
                    id: 2,
                    title: 'Final Fumes',
                    description: 'Feature complete atmospheric horror roguelike made with a team of 4.',
                    imageUrl: 'images/FinalFumesCover.png',
                    videoUrl: 'videos/FinalFumesTrailer.mp4',
                    link: 'https://isrichards6.itch.io/final-fumes',
                    technologies: ['C#', 'Unity', 'MagicaVoxel', 'Blender']
                },
                {
                    id: 3,
                    title: "FINALLY WE'RE ALONE",
                    description: 'Rhythm based top-down horror game. Made in 3 weeks solo for the 2025 Music Video Game Jam.',
                    imageUrl: 'images/fwa.png',
                    link: 'https://isrichards6.itch.io/finally-were-alone',
                    technologies: ['C++', 'Unreal Engine', 'Blender']
                }
                // {
                //     id: 4,
                //     title: 'Dungeon Diner',
                //     description: '2.5D cooking adventure prototype to show off a novel gameplay loop.',
                //     imageUrl: 'images/DungeonDinerCover.png',
                //     videoUrl: null,
                //     link: 'https://isrichards6.itch.io/dungeon-diner',
                //     technologies: ['C#', 'Unity', 'Aesprite']
                // }
            ],
            // TODO: skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Bootstrap', 'C++', 'C#', 'Unity', 'Python']
            models: [
                {
                    id: 'model1',
                    title: 'Goblin Head',
                    description: 'Low poly unlit goblin head. Tris: 384 Verts: 194',
                    src: 'models/goblin.glb',
                    alt: '3D model of a goblin head',
                    poster: 'images/goblin.png',
                    cameraOrbit: '80deg 75deg 100%',
                    exposure: '1.0',
                    shadowIntensity: '1',
                    environmentImage: 'neutral'
                },
                {
                    id: 'model2',
                    title: 'Fried egg',
                    description: 'Stylized low poly unlit fried egg. Tris: 638 Verts: 236',
                    src: 'models/egg.glb',
                    alt: '3D model of a fried egg',
                    poster: 'images/egg.png',
                    cameraOrbit: '-50deg 70deg 100%',
                    exposure: '1.0',
                    shadowIntensity: '1',
                    environmentImage: 'neutral'
                },
                {
                    id: 'model3',
                    title: 'Jeep Cherokee Briarwood',
                    description: 'Voxelized Jeep model used for the player character in Final Fumes. (1:3 voxel-to-cm scale)',
                    src: 'models/jeep.glb',
                    alt: '3D model of a jeep',
                    poster: 'images/jeep.png',
                    cameraOrbit: '-30deg 75deg 100%',
                    exposure: '1.0',
                    shadowIntensity: '1',
                    environmentImage: 'neutral'
                }
                // {
                //     id: 'model4',
                //     title: 'Vehicle Dash',
                //     description: 'A x4 scaled version of the vehicle dash used for UI purposes in Final Fumes. (1:0.75 voxel-to-cm scale)',
                //     src: 'models/dash.glb',
                //     alt: '3D model of a character bust',
                //     poster: 'images/dash.png',
                //     cameraOrbit: '180deg 70deg 100%',
                //     exposure: '0.8',
                //     shadowIntensity: '0.8',
                //     environmentImage: 'neutral'
                // }
            ]
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
    }
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
                        <a :href="link" class="btn btn-outline-secondary btn-sm" target="_blank" rel="noopener noreferrer">View Project</a>
                    </div>
                </div>
            </div>
        </div>
    `
});

app.component('model-viewer-card', {
    props: {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, default: '' },
        src: { type: String, required: true },
        alt: { type: String, required: true },
        poster: { type: String, default: null },
        cameraOrbit: { type: String, default: '0deg 75deg 105%' },
        exposure: { type: String, default: '1.0' },
        shadowIntensity: { type: String, default: '1' },
        environmentImage: { type: String, default: 'neutral' } // 'neutral', null, or path to .hdr
    },
    data() {
        return {
            isWireframe: false
        };
    },
    methods: {
toggleWireframe() {
            this.isWireframe = !this.isWireframe;
            const viewer = this.$refs.viewer;

            if (!viewer) return;

            viewer.shadowIntensity = this.isWireframe ? '0' : '1'

            const scene = viewer[Object.getOwnPropertySymbols(viewer).find(e => e.description === 'scene')];

            if (scene) {
                scene.traverse((object) => {
                    if (object.isMesh) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(material => material.wireframe = this.isWireframe);
                        } else if (object.material) {
                            object.material.wireframe = this.isWireframe;
                        }
                    }
                });
                scene.queueRender();
            }
        },
    },
    template: `
        <div class="col-md-6 col-lg-4 mb-4 d-flex">
            <div class="card h-100 w-100 shadow-sm">
                <model-viewer
                    ref="viewer"
                    @load="onModelLoad"
                    :id="'mv-' + id"
                    class="model-viewer-instance"
                    :src="src"
                    :alt="alt"
                    :poster="poster"
                    :camera-orbit="cameraOrbit"
                    :exposure="exposure"
                    :shadow-intensity="shadowIntensity"
                    :environment-image="environmentImage"
                    camera-controls
                    touch-action="pan-y"
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    reveal="auto">
                    <button @click="toggleWireframe" class="btn btn-outline-secondary btn-sm wireframe-button">
                        {{ isWireframe ? 'Show Solid' : 'Show Wireframe' }}
                    </button>
                </model-viewer>
                <div class="card-body">
                    <h5 class="card-title">{{ title }}</h5>
                    <p v-if="description" class="card-text"><small>{{ description }}</small></p>
                </div>
            </div>
        </div>
    `
});

app.config.compilerOptions.isCustomElement = tag => tag === 'model-viewer';

app.mount('#app');