import { Text, Graphics, Container, Sprite } from "pixi.js";
import { Easing, Tween } from "tweedle.js";
import { Manager } from "../manager";
export class ProjectScene extends Container {
    #idx = 0;
    #projWidth = 240;
    #margin = 30;
    // a scene covering  only half the screen what a joke
    constructor() {
        super();
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.isActive = true;
        this.isClicked = false;
        this.activeIdx = -1;
        this.scrollJuice = 0;
        this.head = 0;
        this.sceneWidth = this.screenWidth * 1.5;
        this.#projWidth = this.sceneWidth / 6;
        this.x = this.screenWidth / 2 - this.sceneWidth / 2;
        this.projects = [];
        this.makeProject("pancreas");
        this.makeProject("drum");
        this.makeProject("quotes");
        this.makeProject("workout");
        this.makeProject("quotes");
        this.makeProject("workout");
        this.mod = this.sceneWidth + this.#projWidth / 2;

        this.projects.forEach((proj, idx) => {
            this.addChild(proj);

            proj.on("click", () => {
                if (this.isClicked) return;
                let trans = new Array(this.projects.length).fill(0);
                let diff = 0
                let dist = 0
                let modDiff = diff
                if (this.activeIdx === -1) {
                    diff = this.#projWidth
                    dist =
                        this.screenWidth -
                            this.x -
                            this.#margin -
                            this.#projWidth*2-
                            proj.x;
                    this.activeIdx = idx
                    modDiff = diff
                }
                else if (idx === this.activeIdx) {
                    diff = -this.#projWidth

                    this.activeIdx = -1
                    modDiff = diff
                }
                else {
                    diff = this.#projWidth
                    dist =
                        this.screenWidth -
                            this.x -
                            this.#margin -
                            this.#projWidth*2-
                            proj.x;
                    const prevIdx = this.activeIdx
                    let prevDist = 0
                    let prevDiff = -this.#projWidth
                    modDiff = 0
                    this.projects.forEach((proj,i)=>{
                    const cur = this.projects[i];
                        const prev = this.projects[prevIdx]
                        if (i === prevIdx) {
                            this.projects[prevIdx].shrink()
                            //trans[idx]+= prevDiff
                        }
                        else if (cur.x < prev.x) {
                            // trans[idx]+= prevDiff
                        }
                        else {
                            trans[i] += prevDiff
                        }
                    })

                    this.activeIdx = idx
                }

                const W = this.#projWidth * 2;
                const X = this.screenWidth - this.#margin - W;
                this.isClicked = true;
                this.isactive = false;

                for (let i = 0; i < this.projects.length; i++) {
                    const cur = this.projects[i];
                    if (cur.x === proj.x) {
                        !proj.isActive ? proj.enlarge(X, W) : proj.shrink();
                        trans[i] += dist;
                    } else if (cur.x < proj.x) {
                        trans[i] += dist;
                    } else {
                        trans[i] += dist +diff
                    }
                }
                const mod = this.mod
                const tempo = {x:0}
                const july = new Tween(tempo)
                .to({x:modDiff}, 500)
                .onUpdate(() => {
                    console.log(mod,this.mod)
                    this.mod = mod + tempo.x
                })
                .start()
                .onComplete(()=>{
                    console.log(this.mod)


                })
                console.log(trans)
                this.projects.forEach((project, idx) => {
                    let begin = { x: 0 };
                    let end = { x: trans[idx] };
                    const x = project.x;
                    const april = new Tween(begin)
                    .to(end, 500)
                    .onUpdate(() => {
                        project.x = (x + begin.x + this.mod) % this.mod;
                    })
                    .start()
                    .onComplete(() => {
                        this.isClicked = false;
                    })
            .easing(Easing.Quadratic.InOut)
                    ;
                });
            });
        });
        Manager.app.stage.on("wheel", (e) => {
            this.scrollJuice += e.deltaY;
        });
    }

    update(deltaTime) {
        const isActive = this.projects
        .map((a) => a.isActive)
        .reduce((prev, cur) => {
            return prev || cur;
        });

        if (isActive) return;
        for (let i = 0; i < this.projects.length; i++) {
            const scrollJuice = this.scrollJuice / 10;
            this.projects[i].x =
                (this.projects[i].x + 2 + scrollJuice + this.mod) % this.mod;
            if (i === this.projects.length - 1) this.scrollJuice -= scrollJuice;
        }
    }

    resize() {
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.x = this.screenWidth > 780 ? this.screenWidth / 2 : 0;
    }

    transitionIn() {
        Manager.app.stage.addChildAt(Manager.currentScene, 1);
        Manager.handleState(3);
    }

    transitionOut() {
        Manager.app.stage.off("wheel");
        Manager.app.stage.removeChild(this);
        this.destroy();
    }
    makeProject(src) {
        const y = Math.max(30, this.screenHeight / 10);
        const width = this.#projWidth;
        const height = this.screenHeight * 0.8;
        const x = (width + this.#margin) * this.#idx++;
        const proj = new Project(x, y, width, height, src);
        this.projects.push(proj);
    }
}

class Project extends Container {
    constructor(x, y, width, height, src) {
        super();
        this.v = 2;
        this.isActive = false;
        this.eventMode = "static";
        this.sprite = Sprite.from(src);
        this.sprite.eventMode = "static";
        this.sprite.cursor = "pointer";
        this.marginY = Math.min(40, height / 10);
        this.bounds = new Graphics().beginFill().drawRect(0, 0, width, height);
        this.x = x;
        this.y = y;
        this.sprite.mask = this.bounds;
        this.addChild(this.sprite, this.bounds);
    }
    // one loop

    enlarge(x, width) {
        this.isActive = true;
        const cur = {
            width: this.bounds.width,
        };
        const target = {
            width: width,
        };
        return new Tween(cur)
            .to(target, 500)
            .onUpdate(() => {
                this.bounds.width = cur.width;
            })
            .start()
            .easing(Easing.Quadratic.InOut)
    }

    shrink() {
        this.isActive = false;
        const cur = {
            width: this.bounds.width,
        };
        const target = {
            width: this.bounds.width / 2,
        };
        return new Tween(cur)
            .to(target, 500)
            .onUpdate(() => {
                this.bounds.width = cur.width;
            })
            .start()
            .easing(Easing.Quadratic.InOut)
    }
}
