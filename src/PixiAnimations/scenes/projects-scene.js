import * as PIXI from "pixi.js"
import { Easing, Tween } from "tweedle.js";
import { Manager } from "../manager";
export class ProjectScene extends PIXI.Container { // a scene covering  only half the screen what a joke 
    constructor() {
        super();
        console.log("hi")
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.text = new PIXI.Text("5:00", { fontFamily: "Orbitron" })

        this.projects = [];
        this.projectsContainer = new PIXI.Container();
        this.projectsContainer.x = this.screenWidth > 780 ? (this.screenWidth / 2) : 0;
        this.projectHover = false;
        this.projectClick = false;
        // this.contactForm = new Contact(this.x, this.screenHeight);
        this.projectHeight = 500;
        this.carouselHeight = (this.projectHeight + 20) * 3 /*Number of projects, no idea how to implement this organically*/
        this.terrainStart = (this.screenHeight - this.carouselHeight) / 2 - this.projectHeight // decrease projectheight so it doesn't appear  
        ///////////////////////////////////////////////////////////////////////////////////////// in the middle  of the screen
        this.terrainEnd = (this.screenHeight + this.carouselHeight) / 2 - this.projectHeight
        // I could position the projects one by one and only assign a value to this variable afterwards. However I doubt I will be changing 
        // its value around a lot, so it's doing just fine for now
    }

    centerProjects(shownProjectY) {
        this.centered = true
        const centerPos = this.screenHeight / 2 - shownProjectY / 2
        new Tween(this.projectsContainer)
            .to({ y: centerPos }, 500)
            .start()
    }
    update(deltaTime) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].isHovered) {
                this.projectHover = true
                break;
            }
            else {
                this.projectHover = false

            }
            if (this.projects[i].isClicked) {
                this.projectClick = true
                if (!this.centered) this.centerProjects(this.projects[i].y)
                break;
            }
            else {
                this.projectClick = false
                this.centered = false
            }
        }
        if (!this.projectHover && !this.projectClick) {
            for (let i = 0; i < this.projects.length; i++) {
                this.projects[i].update()
            }
        }
    }

    resize() {
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.x = this.screenWidth > 780 ? (this.screenWidth / 2) : 0;
    }
    transitionIn() {
        Manager.app.stage.addChildAt(Manager.currentScene, 1)
        //   new Tween()
        //   .to({alpha:PIXI.Loader.shared.progress/100},400)
        //   .onUpdate(()=> {
        //         this.alpha = updated.alpha
        //         })
        //   .onComplete(()=> {
        //         Manager.app.stage.on("mousemove", ()=>{
        //               this.moveOrbits(...Manager.mouseCoordinates())});
        //   })
        //   .start()
    }

    transitionOut() {
        Manager.app.stage.removeChild(this);
this.destroy()
    }
}
export class Project extends PIXI.Container {
    constructor(sprite, index, height, terrainStart, terrainEnd, carouselHeight, url) {
        super();
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
    }

    update(deltaTime) {
    }

    enlarge() {
    }
    shrink() {
            maskScale: this.sprite.mask.scale
}

}
// export class Contact extends PIXI.Container {
//     constructor(width, height) {
//         super();
//         this.rectangle = false;
//         this.x = 200
//         this.screenWidth = Manager.width;
//         this.screenHeight = Manager.height;
//         this.background = new PIXI.Graphics();
//         this.background.beginFill(0x1F1F33)
//             .drawRect(this.screenHeight * Math.tan(-Math.PI / 9), 0, this.screenWidth, this.screenHeight);
//         this.message = new PIXI.Text("Interested in what you see? Contact me!",
//             { align: 'center', fontSize: 24, fill: 0xeeeeee, wordWrap: true, wordWrapWidth: 150 })
//         this.parallelogram = new PIXI.Graphics();
//         this.parallelogram.beginFill();
//         this.parallelogram.drawRect(0, 0, 200, this.screenHeight);
//         this.parallelogram.skew.x = -Math.PI / 9
//         this.mask = this.parallelogram
//         this.addChild(this.background, this.message, this.parallelogram)
//         this.on("pointerdown", () => { this.rectangle ? this.unrectangalize() : this.rectangalize() })
//     }

//     update(deltaTime) {
//     }

//     resize() {
//     }

//     rectangalize() {
//         this.rectangle = true;

//         const stuffToChange = {
//             x: this.x,
//             skew: this.parallelogram.skew.x,
//             width: this.background.width,
//             scale: 1
//         }

//         const changeTo = {
//             x: this.screenHeight * Math.tan(-Math.PI / 9),
//             skew: 0,
//             width: this.screenWidth / 2
//         }
//         const enlargeForm = new Tween(stuffToChange)
//             .to(changeTo, 600)
//             .onUpdate(() => {
//                 this.parallelogram.x = stuffToChange.x
//                 this.parallelogram.skew.x = stuffToChange.skew
//             })
//         enlargeForm.start()
//     }
//     unrectangalize() {
//         this.rectangle = false;
//         const stuffToChange = {
//             x: 0,
//             skew: this.parallelogram.skew.x,
//             width: this.background.width,
//         }

//         const changeTo = {
//             x: 0,
//             skew: -Math.PI / 9,
//             width: 200,
//         }
//         const enlargeForm = new Tween(stuffToChange)
//             .to(changeTo, 600)
//             .onUpdate(() => {
//                 this.x = stuffToChange.x
//                 this.parallelogram.skew.x = stuffToChange.skew
//             })
//         enlargeForm.start()
//     }
// }