const NAMES = {
    // Default to what any student knows. Memes.
    "weapon": ["Sword of HODOR", "Dagger of Shadows", "Fancy Toothpick"],
    "armor": ["Chestplate of Butter", "Rack of Lamb", "Latex Catsuit"],
    "helmet": ["Animal Skull", "Fine Mesh Sifter", "Itchy Beanie"],
    "shield": ["Cardboard Square", "Feather Pillow", "Bouquet of Flowers"]
};

class Room {
    constructor(chest, contents=[], exit=false) {
        this.contents = contents;
        this.hasExit = exit;
        this.chest = chest ? chest : Room.prototype.generateChest.bind(this)();
        this instanceof Room ? Object.freeze(this) : null; //Prevent new chests from ever being added to objects we created, unless the prototype is changed.
    }

    generateChest(equip) {
        if(equip){
            return new Chest(equip); // Allow the implementation to supply their own equipment. Use something default otherwise
        }
        let randType = Math.floor(Math.random() * TYPES.length);
        let randATT = 0;
        let randDEF = 0;
        if(TYPES[randType] == "weapon"){
            randATT = Math.round(Math.random() * 5);
            randDEF = Math.round(Math.random() * (Math.random() * -5)); // A weapon does not provide armor
        }else{
            randATT = Math.round(Math.random() * (Math.random() * -5));// Armor does not provide attack power
            randDEF = Math.round(Math.random() * 5);
        }
        // `eq` because it's short but not `e`, which is customarily for events
        let eq = new Equipment(NAMES[TYPES[randType]][Math.floor(Math.random() * TYPES.length)], TYPES[randType], randATT, randDEF);
        //Make sure this function cannot be called over and over again from the console, to prevent abuse for perfect armor and weapons.
        return new Chest(eq);
    }
}
