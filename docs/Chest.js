class Chest {
    constructor(equipment) {
        if(!(equipment instanceof Equipment)){
            throw new Exception("Not a type of equipment");
        }
        this.reward = equipment;
        this.unlocked = false;
    }

    empty() {
        this.unlocked = true;
        r = this.reward;
        this.reward = null;
        return r;
    }
}
