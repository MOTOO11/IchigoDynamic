/// <reference path="../../typings/index.d.ts" />
"use strict";

class BaseState extends Phaser.State {}

class Main extends BaseState {
  ichigo: Phaser.Sprite;
  public preload() {
    this.game.load.spritesheet("ichigo", "assets/images/いちごちゃんsprite.png", 128, 128);
    this.game.load.spritesheet("ichigo:standby", "assets/images/いちごちゃんsprite.png", 128, 128, 4);
  }
  public create() {
    super.create();
    this.game.stage.disableVisibilityChange = true;
    this.game.stage.backgroundColor = "#666";
    this.ichigo = this.game.add.sprite(40, 40, "ichigo:standby");
    // this.ichigo.animations.add("cut",Phaser.Animation.generateFrameNames("ichigo",0,4,""));
    this.ichigo.animations.add("cut");
    this.game.input.onDown.add(() => {
      this.
      ichigo.animations.play("cut",5, true);
    });
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
    var main: Application = new Application(640, 480, "canvas");console.log("This id is '" + main.game.id + "'!");
};