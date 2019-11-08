function InvalidEntityException(cause, message) { // Include a custom error for invalid equipment
        let ERR = {
            "Message": message,
            "cause": `Invalid parameter: ${cause}`
        };
        return ERR;
    }

class Entity {
    // This creates the option of using Entity to create a more generic attackable
    constructor(life=1, pos={"X": Math.floor(Math.random() * 5), "Y": Math.floor(Math.random() * 5)}) { // Initialize at something, if nothing is given, we'll randomize stuff
        this.lives = life;
        this.roomPos = pos;
    }

    attack(ent){
        if(!(ent instanceof Entity)){
            throw new InvalidEntityException("Not an entity", "You're trying to attack something that isn't attackable!");
        }
        ent.lives += ((this.ATT_STAT >= ent.DEF_STAT) ? ent.DEF_STAT - this.ATT_STAT : 0); // inline if prevents healing if ent.DEF > this.ATT
        return ent.lives;
    }
    
    move(direction, offset){
        (this.roomPos[direction] + offset) >= 0 ? function (){this.roomPos[direction] += offset;}.bind(this)() : null; // This works, don't question the inline if and IDE warnings
        return this.roomPos;
    }
}

class Monster extends Entity {
    constructor(pos, lives=10, attack=3, defense=3) {
        if(pos){
            super(lives, pos);
        }else{
            super(lives);
        }
        this.ATT = attack;
        this.DEF = defense;
    }
    
    get DEF_STAT() {
        return this.DEF;
    }
    get ATT_STAT(){
        return this.ATT;
    }
}

class Player extends Entity {
    constructor(pos, lives=15, attack=4, defense=2) { // Make sure the player can get a weapon without dying on a default monster
        //There is a possibility RNG creates only useless weapons; good luck killing monsters then!
        if(pos){
            super(lives, pos);
        }else{
            super(lives);
        }
        this.ATT = attack;
        this.DEF = defense;
        this.EQUIPPED = {
            "weapon": new Equipment("none", "weapon", 0, 0),
            "shield": new Equipment("none", "shield", 0, 0),
            "armor": new Equipment("none", "armor", 0, 0),
            "helmet": new Equipment("none", "helmet", 0, 0)
        };
        Object.seal(this.EQUIPPED); // Prevent changing it, allow values to be changed.
    }

    get ATT_STAT() {
        let total = this.ATT;
        for(let k in Object.keys(this.EQUIPPED)){
            total += this.EQUIPPED[k] ? this.EQUIPPED[k].attack : 0;
        }
        return total;
    }

    get DEF_STAT() {
        let total = this.DEF;
        for(let k in Object.keys(this.EQUIPPED)){
            total += this.EQUIPPED[k] ? this.EQUIPPED[k].defense : 0;
        }
        return total;
    }
}
