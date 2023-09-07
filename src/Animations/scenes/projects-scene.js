import {Graphics, Texture, Container, Sprite } from "pixi.js";
import { Easing, Tween } from "tweedle.js";
import { Manager } from "../manager";
export class ProjectScene extends Container {
  // a scene covering  only half the screen what a joke
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
let idx = 0;
let dir = 1
const width = 300;
const height = this.screenHeight * 0.8;
const x = () => {
if (idx!==0){ 
  dir*=-1
  if (dir===1) idx--
 }
  return this.screenWidth/2-width/2+(width + 20) * idx++ * dir; 
};
this.addChild(new Graphics().beginFill(0xff0000).drawRect(this.screenWidth/2,0,3,1000))
const y = Math.max(30, this.screenHeight / 10);

  this.proj1 = new Project(x(),y,width,height,"pancreas")
  this.proj2 = new Project(x(),y,width,height,"workout")
  this.proj3 = new Project(x(),y,width,height,"pancreas")
  this.proj4 = new Project(x(),y,width,height,"workout")
  this.proj5 = new Project(x(),y,width,height,"pixiIcon")
  this.addChild(this.proj1, this.proj2, this.proj3, this.proj4, this.proj5);
  }

  update(deltaTime) {}
  resize() {
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth > 780 ? this.screenWidth / 2 : 0;
  }

  transitionIn() {
    Manager.app.stage.addChildAt(Manager.currentScene, 1);
    Manager.handleState(3)
  }

  transitionOut() {
    Manager.app.stage.removeChild(this);
    this.destroy();
  }
}

class Project extends Container {
  constructor(x,y,width, height,src) {
    super();
this.sprite = Sprite.from(src)
this.marginY=  Math.min(40,height/10)
this.boundaries = new Graphics()
  .beginFill()
  .drawRect(0, 0, width, height);
this.x = x
this.y = y
this.sprite.mask = this.boundaries
this.addChild(this.sprite,this.boundaries)

  }
  center() {

  }
}
