class Map {
    constructor(roomcount) {
        this.COORDINATES = {"X": 0, "Y": 0}; // Start at the top-left room. Randomizing it is too much work
        this.ROOMS = {};

        //Variables used in this constructor and then never again
        dimensions = Math.ceil(Math.sqrt(roomcount)); // Attempt a square layout for the rooms; This'll generate a few null values on keys, but JS memory allocation is bad anyway
        exit_created = false;
        created = 0;

        for(i = 0; i < dimensions; i++){
            if(created == roomcount){ // Don't create more rooms than requested, we might end up with a rectangle instead of a square
                break;
            }
            row = "Row" + i.toString();
            this.ROOMS[row] = [];
            for(c = 0; c < dimensions; c++){
                if(!exit_created ? (Math.random() <= 0.05 ? true : false) : false){ // Check for a randomly calculated exit.
                    this.ROOMS[row][c] = new Room(null, [], true);
                    exit_created = true;
                }else{
                    if(i == dimensions && c == dimensions && !exit_created){ // If an exit hasn't been created by the time we reach the last room, force one
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
        return ROOMS["Row"+coordinates.X.toString()][coordinates.Y];
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
