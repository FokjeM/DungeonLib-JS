class Chest {
    constructor(equipment) {
        if(!(equipment instanceof Equipment))
        this.reward = equipment;
    }

    unlock() {
        return this.reward;
    }
}
