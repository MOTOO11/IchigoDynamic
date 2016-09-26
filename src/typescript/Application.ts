/// <reference path="../../typings/index.d.ts" />
// source files.
/// <reference path="./Const.ts"/>
/// <reference path="./Boot.ts"/>
/// <reference path="./Chopper.ts"/>

class Application {
  "use strict";
  game: Phaser.Game;
  constructor(width: number, height: number, targetId: string) {
    this.game = new Phaser.Game(width, height, Phaser.AUTO, targetId, null, false);
    this.game.state.add(State.CHOPPER, Chopper, false);
    this.game.state.add(State.BOOT, Boot, false);
    this.game.state.start(State.BOOT);
    //  this.game.scale.setGameSize(600,400);
  }
}

var main: Application = new Application(400, 200, "canvas");
console.log("This id is '" + main.game.id + "'!");