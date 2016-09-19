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
    return BaseState;
}(Phaser.State));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
    }
    Main.prototype.create = function () {
        _super.prototype.create.call(this);
        this.game.stage.backgroundColor = "#666";
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
window.onload = function () {
    var main = new Application(640, 480, "canvas");
    console.log("This id is '" + main.game.id + "'!");
};
