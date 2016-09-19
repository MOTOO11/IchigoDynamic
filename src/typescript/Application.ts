/// <reference path="../../typings/index.d.ts" />
"use strict";

class BaseState extends Phaser.State {}

class Main extends BaseState {

  public preload() {

  }
  public create() {
    super.create();
    this.game.stage.backgroundColor = "#666";
  }
  public update() {

  }
}

class Application {
  "use strict";
  game: Phaser.Game;
  constructor(width: number, height: number, targetId: string) {
    this.game = new Phaser.Game(width, height, Phaser.AUTO, targetId, null, false);
    this.game.state.add("main", Main, false);
    //  this.game.state.add("main", main.MainState, false);
    this.game.state.start("main");
  }
}

window.onload = () => {
  var main: Application = new Application(640, 480, "canvas");
  console.log("This id is '" + main.game.id + "'!");
};