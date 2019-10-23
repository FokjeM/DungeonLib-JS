const TYPES = ["weapon", "shield", "armor", "helmet"];

function InvalidEquipmentException(cause, message) {
        ERR = {
            "Message": message,
            "cause": `Invalid parameter: ${cause}`
        };
        return ERR;
    }

class Equipment {
    constructor(name, type, attackStat=0, defenseStat=0) {
        if(!TYPES.contains(type)){
            throw new InvalidEquipmentException("type", `INVALID EQUIPMENT TYPE\r\nGiven: ${type}`);
        }
        if(name == ""){
            throw new InvalidEquipmentException("name", `EQUIPMENT NEEDS A NAME\r\nSomething fancy is preferrable`);
        }
        this.ATT_MODIFIER = attackStat;
        this.DEF_MODIFIER = defenseStat;
    }
    //Allowing getters for attack, defense and cosmetic status allows for very complex implementations as well as simple damage = EntityA.attack - EntityB.defense
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
