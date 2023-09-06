
// importing images allows them to be copied into dist file in the final build,e
// as opposed to referencing their paths below
// this is assuming i am using vite, with webpack, webpack-copy-plugin takes cares of that with no imports
export const manifest = {
    bundles: [
        {
            name: "techIcons",
            assets: {
                "pixiIcon": "/images/pixi.png",
                "htmlIcon": "/images/html5.webp",
                "cssIcon":"/images/css3.webp",
                "reactIcon": "/images/react.png",
            }

        },
         {
                name: "rest",
            assets: {
                "bat": "/images/texture.json",
                "tileset": "/images/tileset.json",
                "terrain": "/images/terrain.json",
                "pancreas": "/images/projects/pancreas.png",
                "workout": "/images/projects/workout.png",

            }
        }
    ]
}