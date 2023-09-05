import { Graphics, Container } from "pixi.js";
import { Tween, Easing, Group } from "tweedle.js";
import { WorldMap } from "./scenes/interactive-scene.js";
import { Manager } from "./manager.js";
import { OrbitScene } from "./scenes/orbit-scene.js";
import { ProjectScene } from "./scenes/projects-scene.js";

export class Navbar extends Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth - 100;
    this.y = this.screenHeight * 0.2;
    this.navHeight = 250;
    this.navWidth = 100;
    this.isClicked = false;
    this.sceneSwitcher = 0
    this.load = new Graphics().beginFill(0xff0000).drawCircle(0,0, this.navWidth*0.25);
    this.load.x = this.navWidth/2
    this.ang = 0;
    this.diam = 1;
    this.cyclePart = 0;
    this.spinner = new Graphics().beginFill(0xffff00);
    this.spinner.x = this.navWidth/2;
    this.spinner.y = 0;
    this.load.mask = this.spinner;
    this.addChild(this.load, this.spinner);

    this.project1 = new NavButton(
      this.navWidth / 2,
      0,
      this.navWidth * 0.15,
      OrbitScene,
      true
    );
    this.project2 = new NavButton(
      this.navWidth / 2,
      this.navHeight * 0.3,
      this.navWidth * 0.15,
      WorldMap,
      false
    );
    this.project3 = new NavButton(
      this.navWidth / 2,
      this.navHeight * 0.6,
      this.navWidth * 0.15,
      ProjectScene,
      false
    );
    this.projects = [this.project1, this.project2, this.project3];
    this.prev = { y: this.project1.y };

    this.btnHilight = new Container(); // main circle
    this.btnHilight.x = this.navWidth / 2;
    this.btnHilight.circ1 = new Graphics()
      .beginFill(0x39c0ba)
      .drawCircle(0, 0, this.navWidth * 0.2);
    this.btnHilight.circ2 = new Graphics()
      .beginFill(0x39c0ba)
      .drawCircle(0, 0, this.navWidth * 0.2);
    this.btnHilight.rect = new Graphics()
      .beginFill(0x39c0ba)
      .drawRect(0, 0, this.navWidth * 0.4, 1);
    this.btnHilight.rect.x = -this.navWidth * 0.2;
    this.btnHilight.addChild(
      this.btnHilight.circ1,
      this.btnHilight.circ2,
      this.btnHilight.rect
    );
    this.addChild(this.btnHilight, this.project1, this.project2, this.project3);
    this.prev = this.project1;

    this.projects.forEach((project) => {
      project.on("pointerdown", () => {
        this.changeScene(project, true);
      });
    });

    //   this.project1.on("pointerover", () => {
    //     if (
    //       this.prev.y === this.project2.y ||
    //       this.prev.y === this.project3.y
    //     )
    //       new Tween(this.project1).to({ alpha: 1 }, 300).start();
    //   });
    //   this.project2.on("pointerover", () => {
    //     if (
    //       this.prev.y === this.project1.y ||
    //       this.prev.y === this.project3.y
    //     )
    //       new Tween(this.project2).to({ alpha: 1 }, 300).start();
    //   });
    //   this.project3.on("pointerover", () => {
    //     if (
    //       this.prev.y === this.project1.y ||
    //       this.prev.y === this.project2.y
    //     )
    //       new Tween(this.project3).to({ alpha: 1 }, 300).start();
    //   });
    //   this.project1.on("pointerout", () => {
    //     if (
    //       this.prev.y !== this.project1.y && // don't blur out active project
    //       (this.prev.y === this.project2.y ||
    //         this.prev.y === this.project3.y)
    //     )
    //       // don't activate during transition
    //       new Tween(this.project1).to({ alpha: 0.3 }, 300).start();
    //   });
    //   this.project2.on("pointerout", () => {
    //     if (
    //       this.prev.y !== this.project2.y &&
    //       (this.prev.y === this.project1.y ||
    //         this.prev.y === this.project3.y)
    //     )
    //       new Tween(this.project2).to({ alpha: 0.3 }, 300).start();
    //   });
    //   this.project3.on("pointerout", () => {
    //     if (
    //       this.prev.y !== this.project3.y &&
    //       (this.prev.y === this.project1.y ||
    //         this.prev.y === this.project2.y)
    //     )
    //       new Tween(this.project3).to({ alpha: 0.3 }, 300).start();
    //   });
  }

  update(deltaTime) {
    if (this.cyclePart < 4) {
      this.spinner.clear().beginFill();
      this.diam = (this.diam + 1) % 66;
    }
    if (this.diam === 0) this.cyclePart++;
    switch (this.cyclePart) {
      case 0:
        this.spinner.lineTo(0, -65);
        this.spinner.lineTo(this.diam, -65 + this.diam);
        break;
      case 1:
        this.spinner.lineTo(0, -65);
        this.spinner.lineTo(65, 0);
        this.spinner.lineTo(65 - this.diam, this.diam);
        break;
      case 2:
        this.spinner.lineTo(0, -65);
        this.spinner.lineTo(65, 0);
        this.spinner.lineTo(0, 65);
        this.spinner.lineTo(-this.diam, 65 - this.diam);
        break;
      case 3:
        this.spinner.lineTo(0, -65);
        this.spinner.lineTo(65, 0);
        this.spinner.lineTo(0, 65);
        this.spinner.lineTo(-65, 0);
        this.spinner.lineTo(-65 + this.diam, -this.diam);
        break;
      default:
        this.sceneSwitcher= (this.sceneSwitcher+1)%this.projects.length
        const proj = this.projects[this.sceneSwitcher]
        this.cyclePart= 0
        this.load.y=proj.y
        this.spinner.y=proj.y
        this.changeScene(proj)
    }
    // this.spinner.lineTo(-this.diam,0)
  }
  resize(w, h) {
    this.screenWidth = w;
    this.screenHeight = h;
    this.x = this.screenWidth - 100;
    this.y = this.screenHeight * 0.2;
  }

  changeScene(active,clicked) {
    if (active.y === this.prev.y ) return
    if (!this.isClicked && clicked) {
this.removeChild(this.spinner, this.load)
    // Too lazy to change anchor, should probably use change scale and change anchor instead?
    this.btnHilight.children.forEach(graphic=>graphic.clear())
    this.btnHilight.x = this.navWidth / 2;
    this.btnHilight.circ1.beginFill(0x39c0ba)
      .drawCircle(0, 0, this.navWidth * 0.25);
    this.btnHilight.circ2.beginFill(0x39c0ba)
      .drawCircle(0, 0, this.navWidth * 0.25);
    this.btnHilight.rect.beginFill(0x39c0ba)
      .drawRect(0, 0, this.navWidth * 0.5, 1);
    this.btnHilight.rect.x = -this.navWidth * 0.25;
    }
    active.activate(this.prev);
    this.projects.forEach((project) => {
      if (project.y !== active.y) {
        project.alpha = 0.3;
      } else {
        project.alpha = 1;
      }
    });

    const timeCoeff = 200
    //part 1
    console.log(active.y, this.prev.y,)
    const expandMovement = new Tween(this.btnHilight.rect)
      .to({ height: active.y - this.prev.y }, timeCoeff / 4)
      .onUpdate(() => {
        this.btnHilight.circ2.y =
          this.btnHilight.rect.y + this.btnHilight.rect.height;
      })
      .easing(Easing.Cubic.In)
      .start();

    //part 2
    const shrinkMovement = new Tween(this.btnHilight.rect)
      .to({ height: 1, y: active.y }, timeCoeff * 2)
      .onUpdate(() => {
        this.btnHilight.circ1.y = this.btnHilight.rect.y;
      })
      .easing(Easing.Elastic.InOut);

    expandMovement.chain(shrinkMovement);
    this.prev = {y:active.y};
  }
}

class NavButton extends Graphics {
  constructor(x, y, d, scene, active) {
    super();
    this.x = x;
    this.y = y;
    this.interactive = true;
    this.buttonMode = true;
    this.active = false;
    this.alpha = active?1:0.3;
    this.scene = scene;

    this.beginFill(0xffffff).drawCircle(0, 0, d);
  }
  activate(active) {
   Manager.changeScene(new this.scene());
  }
}
