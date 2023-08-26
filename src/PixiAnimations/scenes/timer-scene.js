import * as PIXI from 'pixi.js'
import { Tween, Easing } from "tweedle.js";
import { Manager } from "../manager.js"

export class NewScene extends PIXI.Container {
      constructor(loading) {
            super();
            this.screenWidth = Manager.width;
            this.screenHeight = Manager.height;

      }
      transitionIn() {
            Manager.app.stage.addChildAt(Manager.newSc, 1) //Put in front of viewport, but behind navbar
      }
      transitionOut() {
            Manager.app.stage.removeChild(Manager.timerScene);
            Manager.app.stage.off("mousemove")
      }
      resize() {
      }
      update(deltaTime) {

      }
}        