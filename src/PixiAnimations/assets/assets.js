import pixisrc from "./images/pixi.png"  // referencing this is the same as directly using an absolute path down there
import reactsrc from "./images/react.png" // for future reference: importing means relative path, using the url means absolute path
export const assets = [

]

export const manifest = {
    bundles: [
        {
            name: "techIcons",
            assets: {
                "pixiIcon": './src/PixiAnimations/assets/images/pixi.png',
                "htmlIcon": './src/PixiAnimations/assets/images/html5.webp',
                "cssIcon": './src/PixiAnimations/assets/images/css3.webp',
                "reactIcon": reactsrc,
            }
        }, {
            name: "rest",
            assets: {
                "bat": "./src/PixiAnimations/assets/images/texture.json",
                "tileset": "./src/PixiAnimations/assets/images/tileset.json",
                "terrain": "./src/PixiAnimations/assets/images/terrain.json",
                "pancreas": "./src/PixiAnimations/assets/images/projects/pancreas.png",
                "workout": "./src/PixiAnimations/assets/images/projects/workout.png",

            }
        }
    ]
}
