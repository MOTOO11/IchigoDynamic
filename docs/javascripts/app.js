var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
"use strict";
var BaseState = (function (_super) {
    __extends(BaseState, _super);
    function BaseState() {
        _super.apply(this, arguments);
    }
    BaseState.prototype.preload = function () {
        this.game.load.bitmapFont("Pixeled", "assets/fonts/bitmapfonts/pixeled_0.png", "assets/fonts/bitmapfonts/pixeled.fnt");
    };
    BaseState.prototype.create = function () {
        this.game.stage.backgroundColor = "#eee";
    };
    BaseState.prototype.pad = function (n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    return BaseState;
}(Phaser.State));
var AnimationsName;
(function (AnimationsName) {
    AnimationsName.CHOP = "chop";
    AnimationsName.STANDBY = "standby";
    AnimationsName.BROKEN = "broken";
})(AnimationsName || (AnimationsName = {}));
var SpriteSheetName;
(function (SpriteSheetName) {
    SpriteSheetName.ICHOGO = "ichigo";
    SpriteSheetName.LOG = "log";
})(SpriteSheetName || (SpriteSheetName = {}));
var ImageName;
(function (ImageName) {
    ImageName.BG_FOREST = "background:forest";
    ImageName.SHADOW = "shadow";
})(ImageName || (ImageName = {}));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
        this.count = 0;
    }
    Main.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.game.load.spritesheet(SpriteSheetName.ICHOGO, "assets/images/いちごちゃんsprite.png", 128, 128);
        this.game.load.image(ImageName.BG_FOREST, "assets/images/background_forest.png");
        this.game.load.image(ImageName.SHADOW, "assets/images/shadow.png");
        this.game.load.spritesheet(SpriteSheetName.LOG, "assets/images/薪単品sprite.png", 112, 64);
    };
    Main.prototype.getPaddingCount = function () {
        return this.pad(this.count + "", 19, "") + "";
    };
    Main.prototype.createCounter = function () {
        var counter = this.game.add.bitmapText(13, 10, "Pixeled", this.getPaddingCount(), 40);
        counter.tint = 0x111;
        return counter;
    };
    Main.prototype.createLOG = function () {
        var LOG = this.game.add.sprite(0, 130, SpriteSheetName.LOG);
        LOG.x = (this.game.width - LOG.width) / 2 - 25;
        LOG.animations.add(AnimationsName.BROKEN, [0, 0, 0, 0, 0, 1, 2, 3, 4, 5], 40, false)
            .onComplete.add(function () {
            LOG.destroy();
        });
        return LOG;
    };
    Main.prototype.create = function () {
        var _this = this;
        _super.prototype.create.call(this);
        this.game.add.image(0, 0, ImageName.BG_FOREST);
        this.counter = this.createCounter();
        this.game.stage.disableVisibilityChange = true;
        this.shadow = this.game.add.sprite(0, 130, ImageName.SHADOW);
        this.shadow.x = (this.game.width - this.shadow.width) / 2;
        this.ichigo = this.game.add.sprite(0, 60, SpriteSheetName.ICHOGO);
        this.ichigo.x = (this.game.width - this.ichigo.width) / 2 - 20;
        this.ichigo.animations.add(AnimationsName.STANDBY, [0, 1, 2, 1], 3, true);
        this.ichigo.animations.add(AnimationsName.CHOP, [3, 4, 5, 6, 7, 8, 9, 10, 11], 35, false).onComplete.add(function () {
            _this.ichigo.animations.play(AnimationsName.STANDBY);
            _this.LOG = _this.createLOG();
        });
        ;
        this.game.input.onDown.add(function () {
            if (_this.ichigo.animations.currentAnim.name == AnimationsName.CHOP) {
                _this.ichigo.animations.currentAnim.complete();
            }
            _this.ichigo.animations.play(AnimationsName.CHOP);
            _this.count++;
            _this.counter.destroy();
            _this.counter = _this.createCounter();
            if (_this.LOG.animations.currentAnim.isPlaying) {
                _this.LOG.animations.currentAnim.complete();
            }
            _this.LOG.play(AnimationsName.BROKEN);
        });
        this.ichigo.animations.play(AnimationsName.STANDBY);
        this.LOG = this.createLOG();
    };
    Main.prototype.update = function () {
        this.counter.setText(this.getPaddingCount());
    };
    return Main;
}(BaseState));
var Application = (function () {
    function Application(width, height, targetId) {
        this.game = new Phaser.Game(width, height, Phaser.AUTO, targetId, null, false);
        this.game.state.add("main", Main, false);
        this.game.state.start("main");
    }
    return Application;
}());
var main = new Application(400, 200, "canvas");
console.log("This id is '" + main.game.id + "'!");
