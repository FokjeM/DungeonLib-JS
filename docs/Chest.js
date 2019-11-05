class Chest {
    constructor(equipment) {
        if(!(equipment instanceof Equipment)){
            console.log("chest is now ded");
            throw new Exception("Not a type of equipment");
        }
        this.reward = equipment;
        this.unlocked = false;
    }

    empty() {
        this.unlocked = true;
        let r = this.reward;
        this.reward = null;
        return r;
    }
}
