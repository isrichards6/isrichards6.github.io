export const ProjectsData = [
    {
        id: 1,
        title: 'Heist',
        description:    `3rd person stealth game made as capstone project for 3D Technical Art course. 
                        Worked in technical artist role modeling, texturing, rigging, and animating all characters and props in the game.
                        Additionally, worked on animation, stealth, and NPC AI systems. 
                        
                        
                        
                        <br><br><strong>Preview coming January 5th, 2025</strong>`,
        imageUrl: 'images/heist.png',
        link: '',
        technologies: ['Blender','Unity', 'C#']
    },
    {
        id: 2,
        title: 'Aetherbreak',
        description:    `1st person platformer made on team of 20+ during my 3 month internship at WolverineSoft Studio. I was lead on UI implementation, working closely with art team. 
                        Additionally I was responsible for engineering the save system and also worked on providing full controller support.`,
        imageUrl: 'images/aether.png',
        videoUrl: 'videos/Aetherbreak_Showcase.mp4',
        link: 'https://wolverinesoft-studio.itch.io/aetherbreak',
        technologies: ['Unity', 'C#', 'Figma']
    },
    {
        id: 3,
        title: "FINALLY WE'RE ALONE",
        description:    `Rhythm based escape game. Made in 2 weeks solo for the 2025 Music Video Game Jam. 
                        Implemented behavior tree based AI decision making that utilized pathfinding via A* algorithm. 
                        Created wall dithering shader to prevent view from being obstructed in top-down view.`,
        imageUrl: 'images/fwa.png',
        link: 'https://isrichards6.itch.io/finally-were-alone',
        technologies: ['Unreal Engine', 'C++']
    },
    {
        id: 4,
        title: 'Final Fumes',
        description:    `Vehicle-based horror roguelite made on team of 4 as capstone for Game Development course. In addition to my role as producer, I was in charge of implementing the physics-based vehicle controller and model. 
                        I was also lead on asset optimization via Blender, as well as creating and implementing the diegetic UI elements.`,
        imageUrl: 'images/FinalFumesCover.png',
        videoUrl: 'videos/FinalFumesTrailer.mp4',
        link: 'https://isrichards6.itch.io/final-fumes',
        technologies: ['Unity', 'C#', 'MagicaVoxel', 'Blender']
    },
    
    // {
    //     id: 4,
    //     title: 'Dungeon Diner',
    //     description: '2.5D cooking adventure prototype to show off a novel gameplay loop.',
    //     imageUrl: 'images/DungeonDinerCover.png',
    //     videoUrl: null,
    //     link: 'https://isrichards6.itch.io/dungeon-diner',
    //     technologies: ['C#', 'Unity', 'Aesprite']
    // }
];

export const ModelsData = [
    {
        id: 'burglar',
        title: 'Burglar',
        description: 'Main character for Heist.',
        sketchfabSrc: 'https://sketchfab.com/models/dfca9cdfb2b24f5db28c83f03880b3fc/embed?ui_theme=dark&ui_vr=0&ui_ar=0&ui_inspector=0&ui_settings=0&ui_help=0&ui_infos=0',
        src: '',
        alt: 'Burglar Model'
    },
    {
        id: 'model1',
        title: 'Goblin Head',
        description: 'Low poly unlit goblin head.',
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
        description: 'Stylized low poly unlit fried egg.',
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
];