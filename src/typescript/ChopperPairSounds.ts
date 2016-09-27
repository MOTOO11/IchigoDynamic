/// <reference path="../../typings/index.d.ts" />
/// <reference path="./Const.ts"/>
/// <reference path="./Base.ts"/>

class ChopperPairSounds extends BaseState {
    ichigo: Phaser.Sprite;
    akari: Phaser.Sprite;
    currentChopper: Phaser.Sprite;
    shadowIchigo: Phaser.Sprite;
    shadowAkari: Phaser.Sprite;
    LOG: Phaser.Sprite;
    count: number = 0;
    counter: Phaser.BitmapText;
    chopSound: Phaser.Sound;
    chopSound_1: Phaser.Sound;
    chopSound_2: Phaser.Sound;
    public init(count: number) {
        this.count = count;
    }
    public preload() {
        super.preload();
        this.game.load.audio(SoundName.CHOP_1, "assets/sounds/vipsz3_snd7218.wav");
        this.game.load.audio(SoundName.CHOP_2, "assets/sounds/vipsz3_snd7211.wav");
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
        this.chopSound_1 = this.game.add.audio(SoundName.CHOP_1, 0.9, false);
        this.chopSound_2 = this.game.add.audio(SoundName.CHOP_2, 0.6, false);

        var bg = this.game.add.image(0, 0, ImageName.BG_FOREST);
        bg.inputEnabled = true;
        bg.input.useHandCursor = true;

        this.counter = this.game.add.bitmapText(13, 10, "Pixeled", this.getPaddingCount(), 40); //37

        this.shadowIchigo = this.game.add.sprite(0, 130, ImageName.SHADOW);
        this.shadowIchigo.x = (this.game.width - this.shadowIchigo.width) / 2 - 47;

        this.ichigo = this.game.add.sprite(0, 60, SpriteSheetName.ICHOGO);
        this.ichigo.scale.setTo(-1, 1);
        this.ichigo.x = (this.game.width - this.ichigo.width) / 2 - 25;
        this.ichigo.animations.add(AnimationsName.STANDBY, [0, 1, 2, 1], 3, true);
        this.ichigo.animations.add(AnimationsName.CHOP, [3, 4, 5, 6, 7, 8, 9, 10, 11], 35, false).onComplete.add(() => {
            this.ichigo.animations.play(AnimationsName.STANDBY);
            this.LOG = this.createLOG();
        });

        this.shadowAkari = this.game.add.sprite(0, 130, ImageName.SHADOW);
        this.shadowAkari.x = (this.game.width - this.shadowAkari.width) / 2 + 40;

        this.akari = this.game.add.sprite(0, 60, SpriteSheetName.AKARI);
        this.akari.x = (this.game.width - this.akari.width) / 2 + 20;
        this.akari.animations.add(AnimationsName.STANDBY, [0, 1, 2, 1], 3, true);
        this.akari.animations.add(AnimationsName.CHOP, [3, 4, 5, 6, 7, 8, 9, 10, 11], 35, false).onComplete.add(() => {
            this.akari.animations.play(AnimationsName.STANDBY);
            this.LOG = this.createLOG();
        });

        bg.events.onInputDown.add((p: Phaser.Pointer) => {
            if (this.currentChopper.animations.currentAnim.name == AnimationsName.CHOP) {
                this.currentChopper.animations.currentAnim.complete();
            }
            if (this.currentChopper.animations.currentAnim.name == AnimationsName.CHOP) {
                this.currentChopper.animations.currentAnim.complete();
            }
            if (p.game.input.activePointer.leftButton.isDown) {
                this.ichigo.animations.play(AnimationsName.CHOP);
                this.chopSound_2.play();
                this.currentChopper = this.ichigo;
            } else if (p.game.input.activePointer.rightButton.isDown) {
                this.akari.animations.play(AnimationsName.CHOP);
                this.chopSound_1.play();
                this.currentChopper = this.akari;
            }
            this.count++;
            this.counter.setText(this.getPaddingCount());
            if (this.LOG.animations.currentAnim.isPlaying) {
                this.LOG.animations.currentAnim.complete();
            }
            // this.chopSound.play();
            this.LOG.play(AnimationsName.BROKEN);
        });
        this.ichigo.animations.play(AnimationsName.STANDBY);
        this.akari.animations.play(AnimationsName.STANDBY);

        this.currentChopper = this.ichigo;

        this.LOG = this.createLOG();
        super.create();
        this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.addOnce(() => {
            this.game.state.start(State.CHOPPER_PAIR, true, false, this.count);
        });
        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.addOnce(() => {
            this.game.state.start(State.CHOPPER, true, false, this.count);
        });
    }
}