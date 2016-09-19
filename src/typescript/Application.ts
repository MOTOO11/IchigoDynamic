/// <reference path="../../typings/index.d.ts" />
"use strict";

class BaseState extends Kiwi.State {
  timeText: Kiwi.GameObjects.TextField;
  public constructor(value: string) {
    super(value);
  }
  public update() {
    super.update();
    this.timeText.text = "Time: " + this.game.time.delta();

  }
  public create() {
    super.create();
    this.timeText = new Kiwi.GameObjects.TextField(this, "text", 10, 10, "#000", 16, "normal");
    this.addChild(this.timeText);
    console.log(this.timeText);
  }
}

class Home extends BaseState {

  private logo: Kiwi.GameObjects.StaticImage

  public constructor() {
    super("home")
  }

  public preload() {
    super.preload()
    this.addImage("logo", "asserts/images/kiwilogo.png")
  }

  public create() {
    super.create()
    this.logo = new Kiwi.GameObjects.StaticImage(this, this.textures["logo"], 100, 100)
    this.addChild(this.logo)
  }

  public update() {
    super.update()
  }
}

class Roulette extends BaseState {
  constructor() {
    super("ガチャ");
  }

}


class CardViewer extends BaseState {

}


class Card extends BaseState {

}


class Result extends BaseState {

}



var game = new Kiwi.Game(null, "Hello World", null, {
  renderer: Kiwi.RENDERER_CANVAS,
  width: 400,
  height: 700
});
game.states.addState(new Home(), true);
//game.states.switchState


// class Application {
//   "use strict";
//   constructor() {
//     console.log("ee");
//   }
// }