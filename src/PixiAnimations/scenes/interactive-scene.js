import {Container, Graphics, Assets, AnimatedSprite } from 'pixi.js'
import { CompositeTilemap, Tilemap } from '@pixi/tilemap';
import { Manager } from '../manager.js';
import { Tween, Easing } from 'tweedle.js';
import mapData from '../assets/data/map.json'
export class WorldMap extends Container {
    constructor() {
        super();
        //initialize drag
        Manager.viewport
            .drag({
                // pressDrag: true,
                wheel: false
            });

        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.batMovement = Assets.get("bat").animations
        // this.tileProps = PIXI.Loader.shared.resources.tileset.textures;
        this.mapLayers = mapData.layers;
        this.layerIds = []
        this.layerIps = []
        this.tilemap = new CompositeTilemap()
        this.tilemaps = []
        for (let i = 0, arr = []; i < 52 * 32; i++) {
            arr.push(i)
            if (i === this.mapLayers[0].width * this.mapLayers[0].height - 1) {
                this.layerIds = this.mapLayers.map(() => arr)
                this.layerIps = this.mapLayers.map(() => arr)
                this.tilemaps = this.mapLayers.map(() => (new CompositeTilemap()))
                this.addChild(...this.tilemaps)
            };
        }

        this.archon = new Graphics()
        this.archon.x = this.screenWidth/2
        this.archon.y = this.screenHeight/2
        this.addChild(this.archon)
this.diam = 400 
        this.ang = 0
        this.moon = 1
        this.archon.beginFill(0xffcc00)
        this.archon.lineStyle(10)
    }

    update(deltaTime) {
        this.moon = (this.moon+1) % 2
        let sin = Math.sin(this.ang)
        let cos = Math.cos(this.ang)
        this.ang += 5
this.archon
  .lineTo(cos*this.diam-1,sin*this.diam-1)
  .lineTo(cos*this.diam,sin*this.diam)

  if (this.moon%2) { this.archon.drawCircle(cos*this.diam, sin*this.diam,2)

 }
this.archon.scale.set(this.skill)
        for (let layer = 0; layer < this.layerIds.length; layer++) {
            if (this.layerIds[layer].length > 0) {
                const curLayer = this.layerIds[layer]
                for (let i = 0, blink = 16; i < blink; i++) {
                    const randIndex = Math.floor(curLayer.length * Math.random())
                    let randTile = this.mapLayers[layer]["data"][curLayer[randIndex]]
                    if (randTile !== 0) {
                        if (randTile > 3000) { randTile = this.extractTile(randTile) }
                        this.tilemaps[layer].tile(String(randTile),
                            curLayer[randIndex] % 52 * 32,
                            Math.floor(curLayer[randIndex] / 52) * 32)
                    }
                    this.layerIds[layer] = curLayer.slice(0, randIndex)
                        .concat(curLayer.slice(randIndex + 1))
                }
            }
            if (this.layerIds[layer].length < 800) {
                const newBat = new AnimatedSprite(this.batMovement.move_right)
                const moveInterval = 2500 + Math.floor(Math.random() * 500)
                const randomDirection = [-1, 1][Math.floor(Math.random() * 2)]

                newBat.y = 32 * 32 / 2 + Math.random() * 32 * 32 / 4;
                newBat.animationSpeed = 0.1;

                newBat.play();
                new Tween(newBat)
                    .to({ x: 52 * 32 + 1, y: newBat.y + randomDirection * Math.floor(Math.random() * 400) }, moveInterval)
                    .yoyo(true)
                    .onComplete(() => {
                        newBat.destroy()
                        this.removeChild(newBat)
                    })
                    .start();
                this.addChild(newBat);
                break;
            }
        }
    }

    /**
     * @param {number} id
     */
    extractTile(id) {
        let rotation = 0
        let newId = id
        newId -= 0x80000000
        if (newId > 0x40000000) {
            newId -= 0x40000000
            rotation = Math.PI / 2
        }
        if (newId > 0x20000000) {
            newId -= 0x20000000
            rotation = Math.PI
        }
        return newId
    }

    transitionIn() {
        Manager.app.stage.addChild(Manager.currentScene)
        Manager.viewport.addChildAt(Manager.currentScene, 0)
    }
    transitionOut() {
        Manager.viewport.removeChild(this)
this.destroy();
    }
    resize(w, h) {
        this.screenWidth = w
        this.screenHeight = h
    }

}