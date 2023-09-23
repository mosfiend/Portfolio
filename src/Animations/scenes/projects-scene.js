import { DisplacementFilter, Graphics, Container, Sprite } from "pixi.js";
import { Easing, Tween } from "tweedle.js";
import { Manager } from "../manager";
import projectData from "../../assets/data/ProjectData.json"
export class ProjectScene extends Container {
    #idx = 0;
    #projWidth = 240;
    #margin = 30;
    constructor() {
        super();
        Manager.handleProject(-1)
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height
        this.isActive = true;
        this.isClicked = false;
        this.activeIdx = -1;
        this.scrollJuice = 0;
        this.head = 0;
        this.sceneWidth = this.screenWidth*1.5
        const projects = projectData.projects
        this.#projWidth = (this.sceneWidth) / projects.length-this.#margin;
        this.x = -this.#projWidth
        this.projects = [];
projects.map((project)=>{
        this.makeProject(project.id);
})
        this.mod = this.sceneWidth
                this.displacementSprite = Sprite.from(("displacement"))
                this.displacementSprite.x = -this.x
                this.displacementSprite.width= this.screenWidth
                this.displacementSprite.height= this.screenHeight
                this.addChild(this.displacementSprite)
        this.filter= new DisplacementFilter(this.displacementSprite)
        this.filter.scale.y = 0
        this.filters= [this.filter]
        this.projects.forEach((proj, idx) => {
            this.addChild(proj);

            proj.on("pointerdown", () => {
                if (this.isClicked) return;
            this.filter.scale.x = 0
                let trans = new Array(this.projects.length).fill(0);
                let diff = 0
                let dist = 0
                let modDiff = diff
                if (this.activeIdx === -1) {
                    diff = proj.maxWidth -proj.minWidth
                    dist =
                        this.screenWidth -
                            this.x -
                            this.#margin -
                            proj.maxWidth-
                            proj.x;
                    this.activeIdx = idx
                    modDiff = diff
                    this.isActive= false
                    Manager.handleProject(idx)
                }
                else if (idx === this.activeIdx) {
                    diff = proj.minWidth -proj.maxWidth
                    this.activeIdx = -1
                    modDiff = diff
                    this.isActive= true
                    Manager.handleProject(-1)
                }
                else {
                    diff = proj.maxWidth -proj.minWidth
                    dist =
                        this.screenWidth -
                            this.x -
                            this.#margin -
                             proj.maxWidth -
                            proj.x;
                    const prevIdx = this.activeIdx
                    let prevDist = 0
                    // let prevDiff = -this.#projWidth
                    // diff = proj.minWidth -proj.maxWidth
                    let prevDiff = this.projects[prevIdx].minWidth -this.projects[prevIdx].maxWidth
                    modDiff =diff +prevDiff
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
                    this.isActive = false
                    Manager.handleProject(idx)
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
                const tempo = {x:0,scale:-dist/this.screenWidth*250}
                this.filter.scale.x = tempo.scale

                const july = new Tween(tempo)
                    .to({x:modDiff,scale:0}, 500)
                .onUpdate(() => {
                    this.mod = mod + tempo.x
this.filter.scale.x=tempo.scale
                })
                .start()
                .onComplete(()=>{
            this.filter.scale.x = 0

                })
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
                    }) ;
                });
            });
        });
        Manager.app.stage.on("wheel", (e) => {
            if (!this.isActive) return;
            this.scrollJuice += e.deltaY*1.2;
        });
    }

    update(deltaTime) {
        const isActive = this.projects
        .map((a) => a.isActive)
        .reduce((prev, cur) => {
            return prev || cur;
        });

        if (isActive) return;
            const scrollJuice = this.scrollJuice/20;
        for (let i = 0; i < this.projects.length; i++) {
            this.projects[i].x =
                ((this.projects[i].x + 2 + scrollJuice + this.mod) % this.mod);
            this.filter.scale.x = -(( scrollJuice  ))
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
        Manager.handleState(1);
        Manager.handleBgState(1,1)
    }

    transitionOut() {
        Manager.handleBgState(1,0)
        Manager.app.stage.off("wheel");
        Manager.app.stage.removeChild(this);
        this.destroy();
    }
    makeProject(src) {
        const y = Math.max(30, this.screenHeight / 20);
        const width = this.#projWidth;
        const height = this.screenHeight * 0.9;
        const x = (width + this.#margin) * this.#idx++;
        const proj = new Project(x, y, width, height, src);
        this.projects.push(proj);
    }
}

class Project extends Container {
    constructor(x, y, width, height, src) {
        super();
        this.isActive = false;
        this.eventMode = "static";
        this.sprite = Sprite.from(src);
        this.sprite.eventMode = "static";
        this.sprite.cursor = "pointer";
        this.marginY = Math.min(40, height / 10);
        this.minWidth = width;
        this.maxWidth = Math.min(this.sprite.width,this.minWidth*2);
        this.bounds = new Graphics().beginFill().drawRect(0, 0, width, height);
        this.x = x;
        this.y = y;
        this.sprite.mask = this.bounds;
        this.addChild(this.sprite, this.bounds);
    }
    // one loop

    enlarge() {
        this.isActive = true;
        const cur = {
            width: this.bounds.width,
        };
        const target = {
            width: this.maxWidth,
        };
        return new Tween(cur)
            .to(target, 500)
            .onUpdate(() => {
                this.bounds.width = cur.width;
            })
            .start()
    }

    shrink() {
        this.isActive = false;
        const cur = {
            width: this.bounds.width,
        };
        const target = {
            width: this.minWidth
        };
        return new Tween(cur)
            .to(target, 500)
            .onUpdate(() => {
                this.bounds.width = cur.width;
            })
            .start()
    }
}
