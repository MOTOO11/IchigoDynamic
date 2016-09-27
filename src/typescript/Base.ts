/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Const.ts"/>

class BaseState extends Phaser.State {
    public preload() {
        this.game.load.bitmapFont(
            "Pixeled", "assets/fonts/bitmapfonts/pixeled_0.png", "assets/fonts/bitmapfonts/pixeled.fnt");
        this.game.load.spritesheet(SpriteSheetName.ICHOGO,
            "assets/images/いちごちゃんsprite.png", 128, 128);
        this.game.load.spritesheet(SpriteSheetName.AKARI,
            "assets/images/あかりちゃんsprite.png", 128, 128);
        this.game.load.image(ImageName.BG_FOREST, "assets/images/background_forest.png");
        this.game.load.image(ImageName.SHADOW, "assets/images/shadow.png");
        this.game.load.spritesheet(SpriteSheetName.LOG, "assets/images/薪単品sprite.png", 112, 64);
        this.game.load.audio(SoundName.CHOP, "assets/sounds/kick-low1.mp3");

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