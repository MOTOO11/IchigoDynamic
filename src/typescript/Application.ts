/// <reference path="../../typings/index.d.ts" />
"use strict";

class BaseState extends Phaser.State {
  public preload() {
    this.game.load.bitmapFont(
      "Pixeled", "assets/fonts/bitmapfonts/pixeled_0.png", "assets/fonts/bitmapfonts/pixeled.fnt");
  }

  public create() {
    this.game.stage.backgroundColor = "#eee";
  }
  public pad(n: string, width: number, z: string) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}

module AnimationsName {
  export var CHOP = "chop";
  export var STANDBY = "standby";
  export var BROKEN = "broken";
}
module SpriteSheetName {
  export var ICHOGO = "ichigo";
  export var LOG = "log";
}

module ImageName {
  export var BG_FOREST = "background:forest";
  export var SHADOW = "shadow";
}

class Main extends BaseState {
  ichigo: Phaser.Sprite;
  shadow: Phaser.Sprite;
  LOG: Phaser.Sprite;
  count: number = 0;
  counter: Phaser.BitmapText;
  public preload() {
    super.preload();
    this.game.load.spritesheet(SpriteSheetName.ICHOGO,
      "assets/images/いちごちゃんsprite.png", 128, 128);
    this.game.load.image(ImageName.BG_FOREST, "assets/images/background_forest.png");
    this.game.load.image(ImageName.SHADOW, "assets/images/shadow.png");
    this.game.load.spritesheet(SpriteSheetName.LOG, "assets/images/薪単品sprite.png", 112, 64);
  }

  public getPaddingCount() {
    return this.pad(this.count + "", 19, "") + "";
  }

  public createCounter() {
    var counter = this.game.add.bitmapText(13, 10, "Pixeled", this.getPaddingCount(), 40); //37
    counter.tint = 0x111;
    return counter;
  }

  public createLOG() {
    var LOG = this.game.add.sprite(0, 130, SpriteSheetName.LOG);
    LOG.x = (this.game.width - LOG.width) / 2 - 25;

    LOG.animations.add(AnimationsName.BROKEN, [0,0,0,0,0, 1, 2, 3, 4, 5], 40, false)
      .onComplete.add(() => {
        LOG.destroy();
      });
    return LOG;
  }

  public create() {
    super.create();
    this.game.add.image(0, 0, ImageName.BG_FOREST);
    this.counter = this.createCounter();
    this.game.stage.disableVisibilityChange = true;

    this.shadow = this.game.add.sprite(0, 130, ImageName.SHADOW);
    this.shadow.x = (this.game.width - this.shadow.width) / 2;

    this.ichigo = this.game.add.sprite(0, 60, SpriteSheetName.ICHOGO);
    this.ichigo.x = (this.game.width - this.ichigo.width) / 2 - 20;
    this.ichigo.animations.add(AnimationsName.STANDBY, [0, 1, 2, 1], 3, true);

    this.ichigo.animations.add(AnimationsName.CHOP, [3, 4, 5, 6, 7, 8, 9, 10, 11], 35, false).onComplete.add(() => {
      this.ichigo.animations.play(AnimationsName.STANDBY);
      this.LOG = this.createLOG();
    });;
    this.game.input.onDown.add(() => {
      if (this.ichigo.animations.currentAnim.name == AnimationsName.CHOP) {
        this.ichigo.animations.currentAnim.complete();
      }
      this.ichigo.animations.play(AnimationsName.CHOP);
      this.count++;
      this.counter.destroy();
      this.counter = this.createCounter();
      if (this.LOG.animations.currentAnim.isPlaying) {
        this.LOG.animations.currentAnim.complete();
      }
      this.LOG.play(AnimationsName.BROKEN);

    });
    this.ichigo.animations.play(AnimationsName.STANDBY);
    this.LOG = this.createLOG();
  }
  public update() {
    this.counter.setText(this.getPaddingCount());
  }
}

class Application {
  "use strict";
  game: Phaser.Game;
  constructor(width: number, height: number, targetId: string) {
    this.game = new Phaser.Game(width, height, Phaser.AUTO, targetId, null, false);
    this.game.state.add("main", Main, false);
    this.game.state.start("main");
  }
}

var main: Application = new Application(400, 200,"canvas");
console.log("This id is '" + main.game.id + "'!");