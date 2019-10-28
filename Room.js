const NAMES = {
    "weapon": ["Sword of HODOR", "Dagger of Shadows", "Fancy Toothpick"],
    "armor": ["Chestplate of Butter", "Rack of Lamb", "Latex Catsuit"],
    "helmet": ["Animal Skull", "Fine Mesh Sifter", "Itchy Beanie"],
    "shield": ["Cardboard Square", "Feather Pillow", "Bouquet of Flowers"]
}

class Room {
    constructor(chest, contents=[], exit=false) {
        this.chest = chest ? chest : Room.prototype.generateChest().bind(this);
        this.contents = contents;
        this.hasExit = exit;
    }

    generateChest(equip) {
        if(equip){
            return new Chest(equip);
        }
        randType = Math.floor(Math.random() * TYPES.length);
        randATT = 0;
        randDEF = 0;
        if(TYPES[randType] == "weapon"){
            randATT = Math.random() * 5;
            randDEF = Math.random() * (Math.random() * -5); // A weapon does not provide armor
        }else{
            randATT = Math.random() * (Math.random() * -5);// Armor does not provide attack power
            randDEF = Math.random() * 5;
        }
        // `eq` because it's short but not `e`, which is customarily for events
        eq = new Equipment(NAMES[TYPES[randType]][Math.floor(Math.random() * TYPES.length)], TYPES[randType], randATT, randDEF);
        //Make sure this function cannot be called over and over again from the console, to prevent abuse for perfect armor and weapons.
        this.frozen = this instanceof Room ? Object.freeze(this) : null; //Prevent new chests from ever being added to objects we created, unless the prototype is changed.
        delete this.frozen; // We needed this object just to store a value as JS classes don't like random values flying around
        return new Chest(eq);
    }
}
