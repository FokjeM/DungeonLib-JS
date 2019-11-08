class Floor {
    //Decidec to cut the array of rooms from here
    constructor(roomcount=16) { // default to a 4x4 map
        this.MAP = new Map(roomcount);
    }

    changeRoom(coordinates) {
        if(coordinates.X && coordinates.Y){
            return this.MAP.changeRoom.bind(this.MAP, coordinates);
        }
        else{
            // This allows a simple boolean check to exit on changeRoom in a clean manner
            return false;
        }
    }

    generateMap(roomcount=16) {
        this.MAP = new Map(roomcount);
        return this.MAP;
    }

    /*
     * DO NOT CALL THIS METHOD IN VAIN
     * REQUIRES BINDING THE FUNCTION WITH floor.exit(room.roomHasExit).bind(floor);
    */
    exit(roomExit) {
        // Call upon the room's roomHasExit getter to make sure
        if(!roomExit){
            return;
        }
        // pure memory management. Prevent lingering objects and destroy remaining data
        delete this.MAP;
        delete this; //VERY definitive
    }
}
