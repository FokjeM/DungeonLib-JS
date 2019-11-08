class Map {
    constructor(roomcount) {
        this.COORDINATES = {"X": 0, "Y": 0}; // Start at the top-left room. Randomizing it is too much work
        this.ROOMS = {};

        //Variables used in this constructor and then never again
        let dimensions = Math.ceil(Math.sqrt(roomcount)); // Force a square layout for the rooms
        let exit_created = false;
        let created = 0;

        for(let i = 0; i < dimensions; i++){
            if(created == roomcount){ // Don't create more rooms than requested, we might end up with a rectangle instead of a square
                break;
            }
            let row = "Row" + i.toString();
            this.ROOMS[row] = [];
            for(let c = 0; c < dimensions; c++){
                if(!exit_created ? (Math.random() <= 0.05 ? true : false) : false){ // Check for a randomly calculated exit.
                    this.ROOMS[row][c] = new Room(null, [], true);
                    exit_created = true;
                }else{
                    if(i == dimensions-1 && c == dimensions-1 && !exit_created){ // If an exit hasn't been created by the time we reach the last room, force one
                        this.ROOMS[row][c] = new Room(null, [], true);
                        exit_created = true;
                    } else { // We already have an exit or we're not at the last room and didn't get a random one yet
                        this.ROOMS[row][c] = new Room(null, [], false);
                    }
                }
                created++;
            }
        }
    }

    changeRoom(coordinates) {
        return this.ROOMS["Row"+coordinates.X.toString()][coordinates.Y];
    }
}

/*
 *Fun code snippet to see how dependable randomly creating exits based on Math.random is:
zero = false;
c = 0;
while(!zero){
  rand = Math.random();
  rand <= 0.005 ? zero = true : zero = false;
  c++;
}
console.log(`Close enough to 0 after ${c} attempts`);
*/
