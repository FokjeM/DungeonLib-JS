const TYPES = ["weapon", "shield", "armor", "helmet"]; // There's a limited amount of options for equipment.

function InvalidEquipmentException(cause, message) { // Include a custom error for invalid equipment
        let ERR = {
            "Message": message,
            "cause": `Invalid parameter: ${cause}`
        };
        return ERR;
    }

class Equipment {
    constructor(name, type, attackStat=0, defenseStat=0) { // default to useless stuff, require a name and type to be given.
        if(!TYPES.includes(type)){
            // invalid type of equipment. NOPE
            throw new InvalidEquipmentException("type", `INVALID EQUIPMENT TYPE\r\nGiven: ${type}`);
        }
        if(name == ""){
            // Equipment requires a name, since a user won't like telling stuff apart by object IDs and memory pointers
            throw new InvalidEquipmentException("name", `EQUIPMENT NEEDS A NAME\r\nSomething fancy is preferable`);
        }
        // Set the stats for the equipment
        this.ATT_MODIFIER = attackStat;
        this.DEF_MODIFIER = defenseStat;
        Object.freeze(this); // Do not allow changing the equipment.
    }
    //Allowing getters for attack, defense and cosmetic status allows for very complex implementations as well as simple damage = EntityA.attack - EntityB.defense
    //Also prevents the usual overrides when people open the console and do Equipment.attack = 9001
    //getter for this.ATT_MODIFIER
    get attack(){
        return this.ATT_MODIFIER;
    }
    //getter for this.DEF_MODIFIER
    get defense(){
        return this.DEF_MODIFIER;
    }
    //If an item has no effect on attack and defense, it's purely cosmetic.
    get cosmetic(){
        return (this.attack == this.defense && attack == 0);
    }

}
