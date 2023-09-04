import { Assets, Application } from "pixi.js";
import { Tween, Group } from "tweedle.js";
import { Viewport } from "pixi-viewport";
import { Navbar } from "./navBar.js";
import { OrbitScene } from "./scenes/orbit-scene";
import { ProjectScene } from "./scenes/projects-scene";
import { manifest } from "./assets/assets";
export class Manager {
  constructor() {}
  static viewport;
  static navbar;
  static prevScene;
  static currentScene;
  static x;
  static y;

  // With getters but not setters, these variables become read-only
  static get width() {
    return Manager.parent.offsetWidth;
  }
  static get height() {
    return Manager.parent.offsetHeight;
  }

  static initialize(el, background, parent, changeScene) {
    Manager.parent = parent;
    Manager.el = el;
    Manager.handleState = changeScene
    // Create our pixi app
    Manager.app = new Application({
      view: Manager.el,
      resizeTo: parent, // This line here handles the actual resize!
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background,
      backgroundAlpha: 0,
      eventMode: "passive",
    });
    globalThis.__PIXI_APP__ = Manager.app;

    Manager.app.stage.interactive = true;
    Manager.app.stage.sortableChildren = true;
    Manager.app.ticker.add(Manager.update);
    window.addEventListener("resize", Manager.resize);
  }

  static resize() {
    if (Manager.curent.scene) {
      Manager.currentScene.resize(Manager.width, Manager.height);
    }
    Manager.navbar.resize(Manager.width, Manager.height);
  }
  static vp() {
    Manager.viewport = new Viewport({
      screenWidth: window.innerWidth, // screen width used by viewport (eg, size of canvas)
      screenHeight: window.innerHeight, // screen height used by viewport (eg, size of canvas)
      worldWidth: Manager.width, // world width used by viewport (automatically calculated based on container width)
      worldHeight: Manager.height, // world height used by viewport (automatically calculated based on container height)
      // passiveWheel: false,                            // whether the 'wheel' event is set to passive (note: if false, e.preventDefault() will be called when wheel is used over the viewport)
      // stopPropagation: false,                      // whether to stopPropagation of events that impact the viewport (except wheel events, see options.passiveWheel)
      // forceHitArea: null,                          // change the default hitArea from world size to a new value
      // noTicker: false,                             // set this if you want to manually call update() function on each frame
      // divWheel: null,                              // div to attach the wheel event (uses document.body as default)
      // disableOnContextMenu: false,                 // remove oncontextmenu=() => {} from the divWheel element
      // interaction: Manager.app.renderer.plugins.events,
      events: Manager.app.renderer.events, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });
    Manager.app.stage.addChildAt(Manager.viewport, 0); // could have just used addChild, just being safe
  }

  static annexes(navScene) {
    Manager.navbar = navScene;
    Manager.app.stage.addChild(Manager.navbar);
  }
  static async initializeLoader() {
    Manager.annexes(new Navbar());
    await Assets.init({ manifest });
    Manager.startScene(new OrbitScene());
    await Assets.loadBundle("techIcons");
    await Assets.loadBundle("rest");
  }

  static startScene(scene) {
    Manager.currentScene = scene;
    Manager.currentScene.transitionIn();
  }

  static changeScene(scene) {
    const oldScene = Manager.currentScene;
    oldScene.transitionOut();
    Manager.currentScene = scene;
    Manager.currentScene.transitionIn();
  }

  static mouseCoordinates() {
    let mousePos = Manager.app.renderer.plugins.interaction.pointer.global;
    return [mousePos.x, mousePos.y];
  }

  static update(deltaTime) {
    Group.shared.update();
    if (Manager.currentScene) {
      Manager.currentScene.update(deltaTime);
    }

    if (Manager.navbar) {
      Manager.navbar.update(deltaTime);
    }
  }
}
