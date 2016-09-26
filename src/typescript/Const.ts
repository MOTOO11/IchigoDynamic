module AnimationsName {
  export const CHOP = "chop";
  export const STANDBY = "standby";
  export const BROKEN = "broken";
}
module SpriteSheetName {
  export const ICHOGO = "ichigo";
  export const AKARI = "akari";
  export const LOG = "log";
}

module ImageName {
  export const BG_FOREST = "background:forest";
  export const SHADOW = "shadow";
}

module SoundName {
  export const  CHOP = "chop";
}

type State = "chopper:solo" | "chopper:pair" | "boot";
namespace State{
    export const CHOPPER:State = "chopper:solo"
    export const BOOT:State = "boot"
    export const CHOPPER_PAIR:State = "chopper:pair"
}
