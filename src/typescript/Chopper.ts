/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Const.ts"/>
/// <reference path="./Base.ts"/>

class Chopper extends BaseState {
    ichigo: Phaser.Sprite;
    shadow: Phaser.Sprite;
    LOG: Phaser.Sprite;
    count: number = 0;
    counter: Phaser.BitmapText;
    chopSound: Phaser.Sound;

    public preload() {
        super.preload();
    }

    public getPaddingCount(): string {
        return this.pad(this.count + "", 19, "");
    }
    public createLOG() {
        var logY: number = 130;
        var LOG = this.game.add.sprite(0, logY, SpriteSheetName.LOG);
        LOG.x = (this.game.width - LOG.width) / 2 + 10;
        var t: Phaser.Tween =
            this.game.add.tween(LOG).from({
                y: 0
            }, 80, null, false, 0, 0, false);
        LOG.animations.add(AnimationsName.BROKEN, [0, 0, 0, 0, 0, 1, 2, 3, 4, 5], 40, false)
            .onComplete.add(() => {
                LOG.destroy();
            });
        t.start();
        return LOG;
    }

    public create() {
        this.chopSound = this.game.add.audio(SoundName.CHOP, 0.25, false);

        var bg = this.game.add.image(0, 0, ImageName.BG_FOREST);
        bg.inputEnabled = true;
        bg.input.useHandCursor = true;

        this.counter = this.game.add.bitmapText(13, 10, "Pixeled", this.getPaddingCount(), 40); //37

        this.shadow = this.game.add.sprite(0, 130, ImageName.SHADOW);
        this.shadow.x = (this.game.width - this.shadow.width) / 2 - 47;

        this.ichigo = this.game.add.sprite(0, 60, SpriteSheetName.ICHOGO);
        this.ichigo.scale.setTo(-1, 1);
        this.ichigo.x = (this.game.width - this.ichigo.width) / 2 - 25;
        this.ichigo.animations.add(AnimationsName.STANDBY, [0, 1, 2, 1], 3, true);
        this.ichigo.animations.add(AnimationsName.CHOP, [3, 4, 5, 6, 7, 8, 9, 10, 11], 35, false).onComplete.add(() => {
            this.ichigo.animations.play(AnimationsName.STANDBY);
            this.LOG = this.createLOG();
        });

        bg.events.onInputDown.add((p: Phaser.Pointer) => {
            if (!p.game.input.activePointer.leftButton.isDown) return;
            if (this.ichigo.animations.currentAnim.name == AnimationsName.CHOP) {
                this.ichigo.animations.currentAnim.complete();
            }
            this.ichigo.animations.play(AnimationsName.CHOP);
            this.count++;
            this.counter.setText(this.getPaddingCount());
            if (this.LOG.animations.currentAnim.isPlaying) {
                this.LOG.animations.currentAnim.complete();
            }
            this.chopSound.play();
            this.LOG.play(AnimationsName.BROKEN);
        });
        this.ichigo.animations.play(AnimationsName.STANDBY);
        this.LOG = this.createLOG();
        super.create();
        this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.addOnce(() => {
            this.game.state.start(State.CHOPPER, true, false);
        });
        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.addOnce(() => {
            this.game.state.start(State.CHOPPER_PAIR, true, false);
        });
    }
}