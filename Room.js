const NAMES = {
    "weapon": ["Sword of HODOR", "Dagger of Shadows", "Fancy Toothpick"],
    "armor": ["Chestplate of Butter", "Rack of Lamb", "Latex Catsuit"],
    "helmet": ["Animal Skull", "Fine Mesh Sifter", "Itchy Beanie"],
    "shield": ["Cardboard Square", "Feather Pillow", "Bouquet of Flowers"]
}

class Room {
    constructor(chest, contents=[], exit=false) {
        this.chest = chest ? chest : Room.prototype.generateChest();
        this.contents = contents;
        this.hasExit = exit;
    }

    generateChest(equip) {
        if(equip){
            this.chest = new Chest(equip);
            return;
        }
        randType = Math.floor(Math.random() * TYPES.length);
        randATT = 0;
        randDEF = 0;
        if(TYPES[randType] == "weapon"){
            randATT = Math.random() * 5;
            randDEF = Math.random() * (Math.random() * -5);
        }else{
            randATT = Math.random() * (Math.random() * -5);
            randDEF = Math.random() * 5;
        }
        // `eq` because it's short but not `e`, which is customarily for events
        eq = new Equipment(NAMES[TYPES[randType]][Math.floor(Math.random() * TYPES.length)], TYPES[randType], randATT, randDEF);
        this.chest = new Chest(eq);
    }
}
