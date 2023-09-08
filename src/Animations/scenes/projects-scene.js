import { Graphics, Container, Sprite } from "pixi.js";
import { Easing, Tween } from "tweedle.js";
import { Manager } from "../manager";
export class ProjectScene extends Container {
  #idx = 0;
  #dir = 1;
  #projWidth = 300;
  #margin = 30
  // a scene covering  only half the screen what a joke
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.isActive = false;
    this.scrollJuice = 0;
    this.projects = [];
    this.makeProject("workout");
    this.makeProject("quotes");
    this.makeProject("pancreas");
    this.makeProject("drum");
    this.makeProject("workout");
    this.makeProject("quotes");
    this.makeProject("pancreas");
    this.makeProject("drum");
    this.head = 0;
    this.tail = this.projects.length - 1;

    this.projects.forEach((proj,idx) => {
      this.addChild(proj);

      proj.on("click", (e) => {
        this.isActive = true

this.tail = idx
        const target = this.projects[idx]
        const newX = this.screenWidth-this.#projWidth*2
        const newW=this.#projWidth
        proj.center(this.screenWidth-this.#projWidth*2,this.#projWidth);
        for (let i=idx+1;i!==this.head;i=(i+1+this.projects.length)%this.projects.length) {
const trueIdx = (i-(idx+1)+this.projects.length)%this.projects.length;
new Tween(this.projects[i]).to({x:newW+newX+(this.#projWidth+30)*trueIdx},400)
.start()
        }
        for (let i=idx+1;i!==this.head;i=(i+1+this.projects.length)%this.projects.length) {
this.roundDown(i)
        }
      });
    });
    Manager.app.stage.on("wheel", (e) => {
      this.scrollJuice += e.deltaY;
    });
  }

  update(deltaTime) {
    if (!this.isActive) {
      for (let i = 0; i < this.projects.length; i++) {
        const scrollJuice = this.scrollJuice / 10;
        this.projects[i].x += 2 + scrollJuice;
        if (i === this.projects.length - 1) this.scrollJuice -= scrollJuice;
      }

    if (this.projects[this.tail].x > this.screenWidth) {
      this.roundDown(this.tail);
      this.tail =
        (this.tail - 1 + this.projects.length) % this.projects.length;
      this.head =
        (this.head - 1 + this.projects.length) % this.projects.length;
    }
      if (this.projects[this.head].x < -this.#projWidth) {
        const target = this.projects[this.head];
        target.x = this.projects[this.tail].x + 30 + target.width;

        this.tail = (this.tail + 1) % this.projects.length;
        this.head = (this.head + 1) % this.projects.length;
      }
    }
  }
  roundDown(idx) {
      console.log(idx,this.tail)
      const target = this.projects[this.tail];
      this.projects[idx].x = this.projects[this.head].x - 30 - target.width;
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
    if (this.#idx !== 0) {
      this.#dir *= -1;
      if (this.#dir === 1) this.#idx--;
    }
    const x =
      this.screenWidth / 2 - width / 2 + (width + this.#margin) * this.#idx++ * this.#dir;
    this.addChild(new Graphics().beginFill(0xff0000).drawRect(x, 0, 3, 1000));
    const proj = new Project(x, y, width, height, src);
    if (this.#dir === -1) {
      this.projects.unshift(proj);
    } else {
      this.projects.push(proj);
    }
  }
}

class Project extends Container {
  constructor(x, y, width, height, src) {
    super();
    this.eventMode = "static";
    this.sprite = Sprite.from(src);
    this.sprite.eventMode = "static";
    this.sprite.cursor = "pointer";
    this.sprite.x = -this.sprite.width / 2;
    this.marginY = Math.min(40, height / 10);
    this.boundaries = new Graphics().beginFill().drawRect(0, 0, width, height);
    this.x = x;
    this.y = y;
    this.sprite.mask = this.boundaries;
    this.addChild(this.sprite, this.boundaries);
  }
  center(x, width) {
    const cur = {

x:this.x,
width:this.boundaries.width
    }
    const target = {
x:500,
width:width*2
    } 
    new Tween(cur)
      .to(target,400)
      .onUpdate(() => {
this.x = cur.x
this.boundaries.width = cur.width
      })
      .start();

  }
}
