import { Text,Graphics, Container, Sprite } from "pixi.js";
import { Easing, Tween } from "tweedle.js";
import { Manager } from "../manager";
export class ProjectScene extends Container {
  #idx = 0;
  #dir = 1;
  #projWidth = 320;
  #margin = 30;
  // a scene covering  only half the screen what a joke
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.isActive = true;
    this.isClicked = false
    this.activeIdx = -1;
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
      (this.projects.length ) * (this.#projWidth + this.#margin);
    (this.limitL =
      this.screenWidth / 2 - this.sceneWidth / 2 - this.#projWidth),
      (this.limitR = this.screenWidth / 2 + this.sceneWidth / 2);
    this.tail = this.projects.length - 1;
    this.distL = 0;
    this.distR = 0;

    this.projects.forEach((proj, idx) => {
      this.addChild(proj);

        proj.on("click", (e) => {
          if (this.isClicked) return;
          this.isClicked = true
          if (this.activeIdx === -1) {
            this.isActive = false;
            this.activeIdx = idx;

            const newW = this.#projWidth * 2;
            const newX = this.screenWidth - newW - this.#margin;
            const trueIdx =
              (idx - this.head + this.projects.length) % this.projects.length;
            const L = newX - this.projects[idx].x;
            const R = L + this.#projWidth;
            this.distL = L;
            this.distR = R;
            for (let i = 0; i < this.projects.length; i++) {
              const curIdx =
                (i - this.head + this.projects.length) % this.projects.length;
              if (curIdx === trueIdx) {
                proj.center(newX, newW).onComplete(()=>{
  this.isClicked = false
                });
              } else if (curIdx < trueIdx) {
                let temp = this.projects[i].x;
                const may = new Tween(this.projects[i])
                  .to(
                    {
                      x: this.projects[i].x + this.distL,
                    },
                    400
                  )
                  .onUpdate(() => {
                    if (this.projects[i].x < this.limitL) {
                      const timeLeft = 400 - may._elapsedTime;
                      may.stop();
                      const target = this.projects[this.tail];
                      this.projects[i].x =
                        target.x + target.bounds.width + 30;
                      this.tail = (this.tail + 1) % this.projects.length;
                      this.head = (this.head + 1) % this.projects.length;
                      const june = new Tween(this.projects[i])
                        .to({}, timeLeft)
                        .onUpdate(() => {
                          this.projects[i].x = target.x + 30 + target.bounds.width
                        })
                        .start();
                    }
                  })
                  .start();
              } else {
                let temp = this.projects[i].x;
                const may = new Tween(this.projects[i])
                  .to(
                    {
                      x: this.projects[i].x + this.distR,
                    },
                    400
                  )
                  .onUpdate(() => {
                    if (this.projects[i].x > this.limitR) {
                      const timeLeft = 400 - may._elapsedTime;
                      const ratio1 = may._elapsedTime / 400;
                      const ratio2 =
                        ((this.projects[i].x - temp) / this.distL) * 100;
                      may.stop();
                      const target = this.projects[this.head];
                      this.projects[i].x =
                        this.projects[this.head].x - this.#projWidth - 30;
                      this.tail =
                        (this.tail - 1 + this.projects.length) %
                        this.projects.length;
                      this.head =
                        (this.head - 1 + this.projects.length) %
                        this.projects.length;
                      const june = new Tween(this.projects[i])
                        .to({}, timeLeft)
                        .onUpdate(() => {
                          this.projects[i].x = target.x - 30 - this.#projWidth;
                        })
                        .start();
                    }
                  })
                  .start();
              }
            }
          } else if (this.activeIdx === idx) {
            this.activeIdx = -1;


            const newW = this.#projWidth * 2;
            const newX = this.screenWidth - newW - this.#margin;
            const trueIdx =
              (idx-this.head + this.projects.length) % this.projects.length;
            const L = newX - this.projects[idx].x;
            const R = L + this.#projWidth;
            this.distL = 0;
            this.distR = this.#projWidth;
            for (let i = 0; i < this.projects.length; i++) {
              const curIdx =
                (i - this.head + this.projects.length) % this.projects.length;
              if (curIdx === trueIdx) {
                this.projects[i].center(newX, newW).onComplete(()=>{
            this.isActive = true;
            this.isClicked = false
                });
              } else if (curIdx < trueIdx) {
              } else {
                const may = new Tween(this.projects[i])
                  .to(
                    {
                      x: this.projects[i].x - this.distR,
                    },
                    400
                  )
                  .start();
              }
            }

          } else {
            this.isActive = false;
            const prev = this.activeIdx
            this.activeIdx = idx;
            const prevIdx = (prev+this.head)%this.projects.length;
            const newW = this.#projWidth * 2;
            const newX = this.screenWidth - newW - this.#margin;
            const trueIdx =
              (idx + this.head) % this.projects.length;
            const L = newX - this.projects[idx].x;
            const R = L + this.#projWidth;
            this.distL = L;
            this.distR = R;

            for (let i = 0; i < this.projects.length; i++) {
              const curIdx =
                (i + this.head ) % this.projects.length;
              if (curIdx === trueIdx) {
                proj.center(newX, newW).onComplete(()=>{
  this.isClicked = false
                });

              } else if (curIdx === prevIdx)  { 
  this.projects[i].center(newX,newW)
  console.log(curIdx,prevIdx,trueIdx)
} else if (curIdx >trueIdx )  {
                const may = new Tween(this.projects[i])
                  .to(
                    {
                      x: this.projects[i].x + this.distL + this.#projWidth
                    },
                    400
                  )
                  .start();

              } else {
                const may = new Tween(this.projects[i])
                  .to(
                    {
                      x: this.projects[i].x + this.distL,
                    },
                    400
                  )
                  .start();
              }
            }
          }

        
        });
    });
    Manager.app.stage.on("wheel", (e) => {
      this.scrollJuice += e.deltaY;
    });
  }

  update(deltaTime) {
    let tail = this.tail
    let head = this.head
    this.projects.forEach((a,i)=>{
if (a.x<=this.projects[this.head].x) head = i
if (a.x>=this.projects[this.tail].x) tail = i
a.text.text=(i-this.head+this.projects.length)%this.projects.length
if (i===this.projects.length-1) {
this.head = head
this.tail = tail
}
    })
    if (!this.isActive) return;
      for (let i = 0; i < this.projects.length; i++) {
        const scrollJuice = this.scrollJuice / 10;
        this.projects[i].x += this.projects[i].v + scrollJuice;
        if (i === this.projects.length - 1) this.scrollJuice -= scrollJuice;
      }
    if (
      this.scrollJuice >= -20 && // temporary way to gauge if projects are going ltr or rtl
      this.projects[this.tail].x > this.limitR
    ) {
      const tail = this.projects[this.tail];
      this.projects[this.tail].x =
        this.projects[this.head].x - 30 - tail.width;
      this.tail = (this.tail - 1 + this.projects.length) % this.projects.length;
      this.head = (this.head - 1 + this.projects.length) % this.projects.length;
    }
    if (this.scrollJuice < -20 && this.projects[this.head].x < this.limitL) {
      const target = this.projects[this.head];
      target.x = this.projects[this.tail].x + 30 + target.width;

      this.tail = (this.tail + 1) % this.projects.length;
      this.head = (this.head + 1) % this.projects.length;
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
    this.isActive = false;
    this.eventMode = "static";
    this.sprite = Sprite.from(src);
    this.sprite.eventMode = "static";
    this.sprite.cursor = "pointer";
    this.marginY = Math.min(40, height / 10);
    this.bounds = new Graphics().beginFill().drawRect(0, 0, width, height);
    this.text = new Text("Hello",{fontSize:30,fill:0xFF0000})
    this.text.x = width/2
    this.x = x;
    this.y = y;
    this.sprite.mask = this.bounds;
    this.addChild(this.sprite, this.bounds,this.text);
  }
// one loop

  center(x, width) {
    this.isActive = !this.isActive;
    if (this.isActive) {
      const cur = {
        x: this.x,
        width: this.bounds.width,
      };
      const target = {
        x: x,
        width: width,
      };
    return  new Tween(cur)
        .to(target, 400)
        .onUpdate(() => {
          this.x = cur.x;
          this.bounds.width = cur.width;
        })
        .start();
    } else {
      const cur = {
        width: this.bounds.width,
      };
      const target = {
        width: width / 2,
      };
    return  new Tween(cur)
        .to(target, 400)
        .onUpdate(() => {
          this.bounds.width = cur.width;
        })
        .start();
    }
  }
}