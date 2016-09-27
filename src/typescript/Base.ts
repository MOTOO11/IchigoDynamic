/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Const.ts"/>

class BaseState extends Phaser.State {
    public preload() {

    }

    public create() {
        super.create();
        this.game.stage.backgroundColor = "#eee";
        document.body.oncontextmenu = function() {
            return false;
        };
        this.game.stage.disableVisibilityChange = true;
        this.game.add.bitmapText(250, 180, "Pixeled", "- " + this.game.state.current + " -", 20);
    }
    public pad(n: string, width: number, z: string) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
}