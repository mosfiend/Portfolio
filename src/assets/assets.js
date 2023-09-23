import projectData from "../assets/data/ProjectData.json"
export const manifest = {
    bundles: [
        {
            name: "filters",
            assets: {
            "displacement":"/images/projects/displacement.jpeg"
            }
            },
        {
            name: "orbitScene",
            assets: {
                "pixiIcon": "/images/pixi.png",
                "htmlIcon": "/images/html5.png",
                "cssIcon":"/images/css3.png",
                "reactIcon": "/images/react.png",
            }
        },
         {
                name: "interactiveScene",
            assets: {
                "bat": "/images/texture.json",
                "tileset": "/images/tileset.json",
                "terrain": "/images/terrain.json",
            }
        },
         {
                name: "projectScene",
        }
    ]
}
const assets= {}
projectData.projects.map((project)=>{
assets[project.id] = `/images/projects/${project.id}.png`
})
manifest.bundles[3].assets = assets
