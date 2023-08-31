import { Ticker, Graphics, Container } from "pixi.js";
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
    this.sortableChildren = true;

    const a =  39
    
    this.project1 = new Graphics();
    this.project2 = new Graphics();
    this.project3 = new Graphics();

    this.projectBtnTransContainer = new Container();
    this.projectBtnTransition1 = new Graphics(); // main circle
    this.projectBtnTransition2 = new Graphics(); // moving part
    this.projectBtnTransition3 = new Graphics(); // moving part

    this.project1.beginFill(0xffffff);
    this.project1.alpha = 1;
    this.project1.drawCircle(0, 0, this.navWidth * 0.15);
    this.project2.beginFill(0xffffff);
    this.project2.alpha = 0.3;
    this.project2.drawCircle(0, 0, this.navWidth * 0.15);
    this.project3.beginFill(0xffffff);
    this.project3.alpha = 0.3;
    this.project3.drawCircle(0, 0, this.navWidth * 0.15);
    this.project2.y = this.navHeight * 0.3;
    this.project3.y = this.navHeight * 0.6;
    this.project1.x = this.navWidth / 2;
    this.project2.x = this.navWidth / 2;
    this.project3.x = this.navWidth / 2;

    this.project1.interactive = true;
    this.project2.interactive = true;
    this.project3.interactive = true;
    this.project1.buttonMode = true;
    this.project2.buttonMode = true;
    this.project3.buttonMode = true;

    this.prevProject = {
      x: this.project1.y,
      y: this.project1.y,
    };
    this.projectBtnTransition1
      .beginFill(0x39c0ba)
      .drawCircle(0, 0, this.navWidth * 0.2);
    this.projectBtnTransition1.x = this.navWidth * 0.5;

    this.projectBtnTransition2
      .beginFill(0x39c0ba)
      .drawRect(0, 0, /*Width*/ this.navWidth * 0.4, 1);

    this.projectBtnTransition2.x = this.navWidth * 0.3;
    this.projectBtnTransition2.y = this.prevProject.y;
    this.projectBtnTransition3
      .beginFill(0x39c0ba)
      .drawCircle(0, 0, this.navWidth * 0.2);
    this.projectBtnTransition3.x = this.navWidth * 0.5;

    this.projectBtnTransContainer.addChild(
      this.projectBtnTransition1,
      this.projectBtnTransition2,
      this.projectBtnTransition3
    );
    this.addChild(
      this.projectBtnTransContainer,
      this.project1,
      this.project2,
      this.project3
    );

    this.activeProject = { y: this.projectBtnTransition1.y };
    this.project1.on("pointerdown", () => {
      if (
        this.activeProject.y !== this.project1.y &&
        (this.activeProject.y === this.project2.y ||
          this.activeProject.y === this.project3.y)
      )
        this.activateProject1();
    });
    this.project2.on("pointerdown", () => {
      if (
        this.activeProject.y !== this.project2.y &&
        (this.activeProject.y === this.project1.y ||
          this.activeProject.y === this.project3.y)
      )
        this.activateProject2();
    });
    this.project3.on("pointerdown", () => {
      if (
        this.activeProject.y !== this.project3.y &&
        (this.activeProject.y === this.project1.y ||
          this.activeProject.y === this.project2.y)
      )
        this.activateProject3();
    });
    this.project1.on("pointerover", () => {
      if (
        this.activeProject.y === this.project2.y ||
        this.activeProject.y === this.project3.y
      )
        new Tween(this.project1).to({ alpha: 1 }, 300).start();
    });
    this.project2.on("pointerover", () => {
      if (
        this.activeProject.y === this.project1.y ||
        this.activeProject.y === this.project3.y
      )
        new Tween(this.project2).to({ alpha: 1 }, 300).start();
    });
    this.project3.on("pointerover", () => {
      if (
        this.activeProject.y === this.project1.y ||
        this.activeProject.y === this.project2.y
      )
        new Tween(this.project3).to({ alpha: 1 }, 300).start();
    });
    this.project1.on("pointerout", () => {
      if (
        this.activeProject.y !== this.project1.y && // don't blur out active project
        (this.activeProject.y === this.project2.y ||
          this.activeProject.y === this.project3.y)
      )
        // don't activate during transition
        new Tween(this.project1).to({ alpha: 0.3 }, 300).start();
    });
    this.project2.on("pointerout", () => {
      if (
        this.activeProject.y !== this.project2.y &&
        (this.activeProject.y === this.project1.y ||
          this.activeProject.y === this.project3.y)
      )
        new Tween(this.project2).to({ alpha: 0.3 }, 300).start();
    });
    this.project3.on("pointerout", () => {
      if (
        this.activeProject.y !== this.project3.y &&
        (this.activeProject.y === this.project1.y ||
          this.activeProject.y === this.project2.y)
      )
        new Tween(this.project3).to({ alpha: 0.3 }, 300).start();
    });

    Ticker.shared.add(this.update.bind(this));
  }
  activateProject1() {
    this.project2.alpha = 0.3;
    this.project3.alpha = 0.3;
    this.project1.alpha = 1;
    const timeCoeff = Math.abs(
      Math.round(
        (this.project1.y - this.prevProject.y) / (this.navHeight * 0.3)
      ) * 150
    );

    const expandMovement = new Tween(this.projectBtnTransition2)
      .to({ height: this.project1.y - this.prevProject.y }, timeCoeff / 4)
      .onUpdate(() => {
        this.projectBtnTransition3.y =
          this.projectBtnTransition2.y + this.projectBtnTransition2.height;
      })
      .easing(Easing.Cubic.In)
      .start();

    const shrinkMovement = new Tween(this.projectBtnTransition2)
      .to({ height: 1, y: this.project1.y }, timeCoeff * 2)
      .onUpdate(() => {
        this.projectBtnTransition1.y = this.projectBtnTransition2.y;
      })
      .easing(Easing.Elastic.InOut);

    expandMovement.chain(shrinkMovement);
    this.prevProject.y = this.project1.y;

    Manager.changeScene(new OrbitScene(), "skillScene");
  }

  activateProject2() {
    this.project1.alpha = 0.3;
    this.project3.alpha = 0.3;
    this.project2.alpha = 1;
    const timeCoeff = Math.abs(
      Math.round(
        (this.project2.y - this.prevProject.y) / (this.navHeight * 0.3)
      ) * 150 
    );

    const expandMovement = new Tween(this.projectBtnTransition2)
      .to({ height: this.project2.y - this.prevProject.y }, timeCoeff / 4)
      .onUpdate(() => {
        this.projectBtnTransition3.y =
          this.projectBtnTransition2.y + this.projectBtnTransition2.height;
      })
      .easing(Easing.Cubic.In)
      .start();

    const shrinkMovement = new Tween(this.projectBtnTransition2)
      .to({ height: 1, y: this.project2.y }, timeCoeff * 2)
      .onUpdate(() => {
        this.projectBtnTransition1.y = this.projectBtnTransition2.y;
      })
      .easing(Easing.Elastic.InOut);

    expandMovement.chain(shrinkMovement);
    this.prevProject.y = this.project2.y;
    Manager.changeScene(new WorldMap(), "mapScene");
  }
  activateProject3() {
    this.project1.beginFill(0xffffff);
    this.project1.alpha = 0.3;
    this.project2.alpha = 0.3;
    this.project3.alpha = 1;
    const timeCoeff = Math.abs(
      Math.round(
        (this.project3.y - this.prevProject.y) / (this.navHeight * 0.3)
      ) * 150
    );

    const expandMovement = new Tween(this.projectBtnTransition2)
      .to({ height: this.project3.y - this.prevProject.y }, timeCoeff / 4)
      .onUpdate(() => {
        this.projectBtnTransition3.y =
          this.projectBtnTransition2.y + this.projectBtnTransition2.height;
      })
      .start()
      .easing(Easing.Cubic.In);

    const shrinkMovement = new Tween(this.projectBtnTransition2)
      .to({ height: 1, y: this.project3.y }, timeCoeff * 2)
      .onUpdate(() => {
        this.projectBtnTransition1.y = this.projectBtnTransition2.y;
      })
      .easing(Easing.Elastic.InOut);

    expandMovement.chain(shrinkMovement);
    this.prevProject.y = this.project3.y;
    Manager.changeScene(new ProjectScene(), "projectScene");
    console.log("curious...");
    console.log(Manager.currentScene);
  }

  update(deltaTime) {
    this.activeProject.y = this.projectBtnTransition1.y;
  }
  resize(w, h) {
    this.screenWidth = w;
    this.screenHeight = h;
    this.x = this.screenWidth - 100;
    this.y = this.screenHeight * 0.2;
  }
}
