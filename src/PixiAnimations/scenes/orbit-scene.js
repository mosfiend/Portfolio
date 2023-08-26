import * as PIXI from 'pixi.js'
import { Tween, Easing, Group } from "tweedle.js";
import { Manager } from "../manager.js"

export class OrbitScene extends PIXI.Container {
      constructor(loading) {
            super();
            this.alpha = 0
            this.screenWidth = Manager.width;
            this.screenHeight = Manager.height;
            this.x = this.screenWidth / 2;
            this.y = 30;
            this.circle1 = new PIXI.Graphics();
            this.circle2 = new PIXI.Graphics();
            this.circle3 = new PIXI.Graphics();
            this.circle4 = new PIXI.Graphics();
            this.circle5 = new PIXI.Graphics();
            this.circle6 = new PIXI.Graphics();
            this.circle7 = new PIXI.Graphics();
            this.circle1.beginFill(0x99EE00)
                  .drawCircle(0, 0, (Math.max(50, this.screenWidth / 20)))
            this.circle2.beginFill(0x7BE801)
                  .drawCircle(0, 0, (Math.max(100, this.screenWidth / 10)))
            this.circle3.beginFill(0x7BE801)
                  .drawCircle(0, 0, (Math.max(150, this.screenWidth * 3 / 20)))
            this.circle4.lineStyle(3, 0x99EE00)
                  .beginFill(0x7BE801)
                  .drawCircle(0, 0, (Math.max(200, this.screenWidth / 5)))
            this.circle5.lineStyle(3, 0x99EE00)
                  .drawCircle(0, 0, (Math.max(250, this.screenWidth / 4)))
            this.circle6.lineStyle(3, 0x99EE00)
                  .drawCircle(0, 0, (Math.max(321, this.screenWidth / 3.11))) //weird aspect radio because original value was 450
            this.circle7.lineStyle(3, 0x99EE00)
                  .drawCircle(0, 0, (Math.max(400, this.screenWidth / 2.5)))

            this.circle1.alpha = 0.8
            this.circle2.alpha = 0.8
            this.circle3.alpha = 0.5
            this.circle4.alpha = 0.2
            this.circle5.alpha = 0.5
            this.circle6.alpha = 0.5
            this.circle7.alpha = 0.5
            this.addChild(this.circle7, this.circle6, this.circle5, this.circle4, this.circle3, this.circle2, this.circle1)
            this.icons = new Array()

            this.mousePosX = 0
            this.mousePosY = 0
            // this.x = Math.random()* circleHeight
            // this.y = Equation(x)

            // if (PIXI.Loader.shared.progress === 100) { b// I COULD HAVE PLACED A PROMISED DIRECTLY HERE, YOU KNOW ASYNC BETTER THAN ME WHY DIDNT YOU DO THIS
            this.loadAssets()
            // this.pixiContainer.popIn()
            //       .chain(this.reactContainer.popIn()
            //             .chain(this.htmlContainer.popIn()
            //                   .chain(this.cssContainer.popIn())))
            //       .start()

            // }
      }

      moveOrbits(X, Y) {
            this.mousePosX = X
            this.mousePosY = Y
            let curPos = {
                  cir1X: this.circle1.x, cir1Y: this.circle1.y,
                  cir2X: this.circle2.x, cir2Y: this.circle2.y,
                  cir3X: this.circle3.x, cir3Y: this.circle3.y,
                  cir4X: this.circle4.x, cir4Y: this.circle4.y,
                  cir5X: this.circle5.x, cir5Y: this.circle5.y,
                  cir6X: this.circle6.x, cir6Y: this.circle6.y,
                  cir7X: this.circle7.x, cir7Y: this.circle7.y,
            }
            let finishPos = {
                  cir1X: (X - this.x) / 8, cir1Y: (-Y + 30) / 16,
                  cir2X: (X - this.x) / 7.5, cir2Y: (-Y + 30) / 15,
                  cir3X: (X - this.x) / 7, cir3Y: (-Y + 30) / 14,
                  cir4X: (X - this.x) / 6.5, cir4Y: (-Y + 30) / 13,
                  cir5X: (X - this.x) / 6, cir5Y: (-Y + 30) / 12,
                  cir6X: (X - this.x) / 5, cir6Y: (-Y + 30) / 10,
                  cir7X: (X - this.x) / 4, cir7Y: (-Y + 30) / 8,
            }
            const moveAll = new Tween(curPos)
                  .to(finishPos, 500)
                  .onUpdate(() => {
                        this.circle1.x = curPos.cir1X;
                        this.circle2.x = curPos.cir2X;
                        this.circle3.x = curPos.cir3X;
                        this.circle4.x = curPos.cir4X;
                        this.circle5.x = curPos.cir5X;
                        this.circle6.x = curPos.cir6X;
                        this.circle7.x = curPos.cir7X;

                        this.circle1.y = curPos.cir1Y;
                        this.circle2.y = curPos.cir2Y;
                        this.circle3.y = curPos.cir3Y;
                        this.circle4.y = curPos.cir4Y;
                        this.circle5.y = curPos.cir5Y;
                        this.circle6.y = curPos.cir6Y;
                        this.circle7.y = curPos.cir7Y;
                        this.alpha = 0.6 + ((-this.screenHeight + 30 - this.circle1.y * 16) / (-this.screenHeight + 30)) * 0.4;
                  })
                  .easing(Easing.Quadratic.Out)
                  .start()
      }

      transitionIn() {
            Manager.app.stage.addChildAt(Manager.skillScene, 1) //Put in front of viewport, but behind navbar
            let updated = { alpha: this.alpha }
            let fadeIn = new Tween(updated)
            // if (game is loaded ) {
            fadeIn
                  .to({ alpha: 1 }, 400)
                  .onUpdate(() => {
                        this.alpha = updated.alpha;
                  })
                  .onComplete(() => {
                        Manager.app.stage.on("mousemove", () => {
                              this.moveOrbits(...Manager.mouseCoordinates())
                        });
                        //       Manager.app.stage.on("pointerdown", ()=>{
                        // new Tween(this)
                        // .to({scale:1},300)
                        // .start()
                        // .repeat(1)
                        // .yoyo(true)
                        // .start()
                        // })
                  })
                  .start()
      }
      async loadAssets() {
            await PIXI.Assets.loadBundle("techIcons")
            this.pixiContainer = new skillIcons("pixiIcon", this.circle7, 557);
            this.reactContainer = new skillIcons("reactIcon", this.circle6, 447);
            this.htmlContainer = new skillIcons("htmlIcon", this.circle5, 347);
            this.cssContainer = new skillIcons("cssIcon", this.circle4, 257);
            this.addChild(this.pixiContainer, this.reactContainer, this.htmlContainer, this.cssContainer)
            this.icons.push(this.pixiContainer, this.reactContainer, this.htmlContainer, this.cssContainer)
            this.pixiContainer.popIn()
                  .chain(this.reactContainer.popIn()
                        .chain(this.htmlContainer.popIn()
                              .chain(this.cssContainer.popIn())))
                  .start()
      }

      transitionOut() {
            Manager.app.stage.off("mousemove")
            function fadeOut(circle, cb) {
                  return new Tween(circle)
                        .to({ width: this.circle5.width, height: this.circle5.height, x: 0, y: 0 }, 150)
                        .onComplete(cb ? cb : () => {             
                  })
                        .easing(Easing.Quadratic.InOut)
            }

            fadeOut.call(this, this.circle7)
                  .chain(fadeOut.call(this, this.circle6, ()=>{new Tween(this).to({alpha:0},500).start()})
                        .chain(fadeOut.call(this, this.circle1,()=>{this.reactContainer.popOut()})
                              .chain(fadeOut.call(this, this.circle5,()=>{this.pixiContainer.popOut()})
                                    .chain(fadeOut.call(this, this.circle2,()=>{this.htmlContainer.popOut()})
                                          .chain(fadeOut.call(this, this.circle4, ()=>{this.cssContainer.popOut()})
                                                .chain(fadeOut.call(this, this.circle3, () => {
                                                      Manager.skillScene.destroy();
                                                      Manager.app.stage.removeChild(Manager.skillScene)
                                                })
                                                )
                                          )
                                    )
                              )
                        )
                  )
                  .start()
      }

      resize(w, h) {
            const isSame = this.screenWidth === w
            this.screenWidth = w
            this.screenHeight = h
            this.x = this.screenWidth / 2
            this.circle1.clear()
            this.circle2.clear()
            this.circle3.clear()
            this.circle4.clear()
            this.circle5.clear()
            this.circle6.clear()
            this.circle7.clear()
            this.circle1.beginFill(0x99EE00)
                  .drawCircle(0, 0, (Math.max(60, this.screenWidth / 20)))
            this.circle2.beginFill(0x7BE801)
                  .drawCircle(0, 0, (Math.max(120, this.screenWidth / 10)))
            this.circle3.beginFill(0x7BE801)
                  .drawCircle(0, 0, (Math.max(180, this.screenWidth / 6)))
            this.circle4.lineStyle(3, 0x99EE00)
                  .beginFill(0x7BE801)
                  .drawCircle(0, 0, (Math.max(240, this.screenWidth / 5)))
            this.circle5.lineStyle(3, 0x99EE00)
                  .drawCircle(0, 0, (Math.max(300, this.screenWidth / 4)))
            this.circle6.lineStyle(3, 0x99EE00)
                  .drawCircle(0, 0, (Math.max(385, this.screenWidth / 3))) //weird aspect radio because original value was 450
            this.circle7.lineStyle(3, 0x99EE00)
                  .drawCircle(0, 0, (Math.max(480, this.screenWidth / 2.5)))
            if (!isSame) {
                  this.icons.forEach((icon) => {
                        icon.sprite.x = (Math.random() * icon.circle.width) * [-0.5, 0.5][(Math.trunc(Math.random() * 2))];
                        icon.sprite.y = icon.getCircleY(icon.sprite.x, icon.circle.x, icon.circle.y, icon.circle.width / 2);
                        icon.sprite.angle = 0
                        icon.angle = 0
                        icon.x = icon.circle.x
                        icon.y = icon.circle.y

                  })
            }
      }
      update(deltaTime) {
            this.icons.forEach((icon) => {
                  icon.spin()
            })
      }
}

export class skillIcons extends PIXI.Container {
      constructor(sprite, circle) {
            super();
            this.alpha = 0
            this.speed = 0.2 + Math.random() * 0.4
            this.spriteName = sprite
            this.circle = circle
            this.sprite = PIXI.Sprite.from(sprite)
            this.sprite.height = 90;
            this.sprite.width = 90;
            this.sprite.anchor.set(0.5, 0.5);
            this.sprite.x = (Math.random() * this.circle.width) * [-0.5, 0.5][(Math.trunc(Math.random() * 2))];
            this.sprite.y = this.getCircleY(this.sprite.x, this.circle.x, this.circle.y, this.circle.width / 2);
            this.addChild(this.sprite)
      }
      setTexture(texture) {
            this.sprite.texture = texture
      }
      spin() {
            this.angle += this.speed
            this.sprite.angle -= this.speed
            this.x = this.circle.x
            this.y = this.circle.y
      }
      getCircleY(iconX, X1, Y1, r) {
            const delta = 4 * Y1 ** 2 - 4 * ((iconX - X1) ** 2 + Y1 ** 2 - r ** 2)
            if (delta === 0) {
                  return Y1
            }
            else if (delta > 0) {
                  return (2 * Y1 + Math.sqrt(delta)) / 2
            }
            else if (delta < 0) { console.log("error shoulna happened") }
      }

      popIn() {
            return new Tween(this)
                  .to({ alpha: 2 }, 300)
      }
      popOut() {
            return new Tween(this)
                  .to({ alpha: 0 }, 200)
                  .repeat(2).yoyo(true)
      }
}
