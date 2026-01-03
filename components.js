export const ProjectCard = {
    props: {
        title: { type: String, required: true },
        role: { type: String, default: '' },
        imageUrl: { type: String, required: true },
        link: { type: String, default: '' },
        description: { type: String, default: '' },
        videoUrl: { type: String, default: '' },
        technologies: { type: Array, default: () => [] }
    },
    template: /*html*/ `
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
                        <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-dark">{{ title }}</a>
                        <span v-else class="text-dark">{{ title }}</span>
                    </h5>
                    <p class="card-text" v-html="description"></p>
                    <div class="mt-auto pt-2">
                        <p class="card-text mb-2"><small class="text-muted">Technologies: {{ technologies.join(', ') }}</small></p>
                        <a v-if="link" :href="link" class="btn btn-outline-secondary btn-sm" target="_blank" rel="noopener noreferrer">View Project</a>
                        <button v-else class="btn btn-outline-secondary btn-sm" disabled>Coming Soon</button>
                    </div>
                </div>
            </div>
        </div>
    `
};

export const ModelCard = {
    props: {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, default: '' },
        sketchfabSrc: { type: String, default: null },
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
    template: /*html*/ `
        <div class="col-md-10 col-lg-6 mb-4 d-flex">
            <div class="card h-100 w-100 shadow-sm">
                <template v-if="sketchfabSrc">
                    <iframe 
                        class="model-viewer-instance" 
                        :src="sketchfabSrc" 
                        title="Sketchfab Viewer" 
                        frameborder="0" 
                        allow="autoplay; fullscreen; xr-spatial-tracking" 
                        xr-spatial-tracking 
                        execution-while-out-of-viewport 
                        execution-while-not-rendered 
                        web-share 
                        allowfullscreen 
                        mozallowfullscreen="true" 
                        webkitallowfullscreen="true">
                    </iframe>
                </template>
                <template v-else>
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
                </template>
                <div class="card-body">
                    <h5 class="card-title">{{ title }}</h5>
                    <p v-if="description" class="card-text"><small>{{ description }}</small></p>
                </div>
            </div>
        </div>
    `
};