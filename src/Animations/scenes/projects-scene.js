import { Graphics, Container, Sprite } from "pixi.js";
import { Easing, Tween } from "tweedle.js";
import { Manager } from "../manager";
export class ProjectScene extends Container {
  #idx = 0;
  #dir = 1;
  #projWidth = 300;
  #margin = 30;
  #num = 1;
  // a scene covering  only half the screen what a joke
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.isActive = false;
    this.scrollJuice = 0;
    this.projects = [];
    this.makeProject("pancreas");
    this.makeProject("drum");
    this.makeProject("workout");
    this.makeProject("quotes");
    this.makeProject("workout");
    this.makeProject("quotes");
    this.head = 0;
    this.sceneWidth =
      (this.projects.length - 1) * (this.#projWidth + this.#margin);
    this.limitL = Math.min(
      this.screenWidth / 2 - this.sceneWidth / 2 - this.#projWidth,
      -this.#projWidth
    );
    this.limitR = Math.max(
      this.screenWidth,
      this.screenWidth / 2 + this.sceneWidth / 2
    );
    this.tail = this.projects.length - 1;

    this.addChild(
      new Graphics().beginFill(0xff0000).drawRect(this.limitL, 0, 3, 1000)
    );
    this.addChild(
      new Graphics().beginFill(0xff0000).drawRect(this.limitR, 0, 3, 1000)
    );
    this.addChild(
      new Graphics()
        .beginFill(0xff0000)
        .drawRect(this.screenWidth / 2, 0, 3, 1000)
    );
    this.projects.forEach((proj, idx) => {
      this.addChild(proj);

      proj.on("click", (e) => {
        this.isActive = true;
        this.tail = idx;
        const target = this.projects[idx];
        const newW = this.#projWidth * 2;
        const newX = this.screenWidth - newW - this.#margin;
        const trueIdx =
          (idx - this.head + this.projects.length) % this.projects.length;
        const distL = newX - this.projects[idx].x 
        const distR = distL + this.#projWidth
        for (let i = 0; i < this.projects.length; i++) {

          const curIdx =
            (i - this.head + this.projects.length) % this.projects.length;
          console.log(curIdx);
          if (curIdx === trueIdx) {
            proj.center(newX, newW);
          } else if (curIdx < trueIdx) {
            const may = new Tween(this.projects[i])
              .to(
                {
                  x: this.projects[i].x+distL
                },
                400
              )
              .start();
          } else {
            const may = new Tween(this.projects[i])
              .to(
                {
                  x: this.projects[i].x+distR 
                },
                400
              )
              .start();
          }
        }

        //         proj.center(newX,newW);
        //         for (let i=(idx+1)%this.projects.length;i!==this.head;i=(i+1+this.projects.length)%this.projects.length) {
        // const trueIdx = (i-(idx+1)+this.projects.length)%this.projects.length;
        // const may =new Tween(this.projects[i]).to({
        //   x:newX+newW+this.#margin+(this.#projWidth+this.#margin)*trueIdx
        // },400).start()
        //         }
        // const head =(this.head-1+this.projects.length)%this.projects.length
        //         console.log(head)
        //         for (let i=(idx-1+this.projects.length)%this.projects.length;i!==head;i=(i-1+this.projects.length)%this.projects.length) {
        // const trueIdx = (i-(this.head)+this.projects.length)%this.projects.length;
        // const may =new Tween(this.projects[i]).to({
        // x:newX-(this.#projWidth+this.#margin)*(trueIdx+1)
        // },400).start()
        //         }
      });
    });
    Manager.app.stage.on("wheel", (e) => {
      this.scrollJuice += e.deltaY;
    });
  }

  update(_deltaTime) {
    if (!this.isActive) {
      for (let i = 0; i < this.projects.length; i++) {
        const scrollJuice = this.scrollJuice / 10;
        this.projects[i].x += this.projects[i].v + scrollJuice;
        if (i === this.projects.length - 1) this.scrollJuice -= scrollJuice;
      }
    }
    if (
      this.scrollJuice >= -20 && // temporary way to gauge if projects are going ltr or rtl
      this.projects[this.tail].x > this.limitR
    ) {
      const target = this.projects[this.tail];
      this.projects[this.tail].x =
        this.projects[this.head].x - 30 - target.width;
      this.tail = (this.tail - 1 + this.projects.length) % this.projects.length;
      this.head = (this.head - 1 + this.projects.length) % this.projects.length;
      this.#num++;
    }
    if (this.scrollJuice < -20 && this.projects[this.head].x < this.limitL) {
      const target = this.projects[this.head];
      target.x = this.projects[this.tail].x + 30 + target.width;

      this.tail = (this.tail + 1) % this.projects.length;
      this.head = (this.head + 1) % this.projects.length;
    }
  }
  roundDown(idx) {}

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
      this.screenWidth / 2 -
      width / 2 +
      (width + this.#margin) * this.#idx++ * this.#dir;
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
    this.v = 2;
    this.eventMode = "static";
    this.sprite = Sprite.from(src);
    this.sprite.eventMode = "static";
    this.sprite.cursor = "pointer";
    this.marginY = Math.min(40, height / 10);
    this.boundaries = new Graphics().beginFill().drawRect(0, 0, width, height);
    this.x = x;
    this.y = y;
    this.sprite.mask = this.boundaries;
    this.addChild(this.sprite, this.boundaries);
  }

  center(x, width) {
  
   const cur ={
      x: this.x,
      width: this.boundaries.width,
    };
    const target = {
      x: x,
      width: width,
    };
    new Tween(cur)
      .to(target, 400)
      .onUpdate(() => {
        this.x = cur.x;
        this.boundaries.width = cur.width;
      })
      .start();
  }
}
