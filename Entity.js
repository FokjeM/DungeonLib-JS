function InvalidEntityException(cause, message) { // Include a custom error for invalid equipment
        ERR = {
            "Message": message,
            "cause": `Invalid parameter: ${cause}`
        };
        return ERR;
    }

class Entity {
    constructor(life=1, pos={"X": Math.floor(Math.random() * 20), "Y": Math.floor(Math.random() * 20)}) { // Initialize at something, if nothing is given, we'll randomize stuff
        this.lives = life;
        this.roomPos = pos;
    }

    attack(ent){
        if(!(ent instanceof Entity)){
            throw new InvalidEntityException("Not an entity", "You're trying to attack something that isn't attackable!");
        }
        //Vulnerable to strong armor, which is the intended purpose.
        ent.lives -= (this.ATT - ent.DEF);
        return;
    }
}

class Monster extends Entity {

}

class Player extends Entity {

}
