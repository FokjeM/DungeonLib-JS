let floor;
let field = document.getElementById("playingfield");
let allRooms = {}; // A front-end map of the rooms. Move up/down a row when the player goes through a room's top/bottom and left/right when going through the sides. Remember to set either position property to 0 or the calculated max.
let currentRoom = {"X": 0, "Y": 0, "Room": null};
let rooms; // Number of rooms in a row/column. These are the same.
let player; // self-explanatory variable
let squareSize; // Size of a square containing an Entity. Used to calculate when to swap rooms.
function init() {
    // Get the disred amount of rooms
    rooms = document.getElementById('roomcount').value;
    //Create a player, dump it at the topleft corner of whatever room he starts in
    player = new Player({"X": 0, "Y": 0});
    // Set the image and styling data
    player.img = document.createElement("img");
    player.img.src = "resources/player.svg";
    player.img.id = "player";
    player.img.className = "entity";
    // Calculate game field
    squareSize = (field.getBoundingClientRect().height) > (field.getBoundingClientRect().width) ? (field.getBoundingClientRect().width/rooms)-4 : (field.getBoundingClientRect().height/rooms)-4;
    // Floor instantiation, gives you every non-Entity object
    floor = new Floor(rooms*rooms);
    // Remove the paragraph marked for delete. We need the space
    document.getElementById('mfd').remove();
    let col = 0;
    // Just put all rooms on-screen. You could also display one room and use the Map object as a map.
    // This somehow swaps the X and Y axis; might be because of how the divs align.
    Object.keys(floor.MAP.ROOMS).forEach(key => {
        let row = [];
        floor.MAP.ROOMS[key].forEach(room => {
            let div = document.createElement("div");
            div.style.width = `${squareSize}px`; // Make it fill the playingfield
            div.style.height = `${squareSize}px`; // Dito for height
            div.className = "room";
            field.appendChild(div);
            let chest = document.createElement("img");
            chest.src = "resources/chest.svg";
            chest.className = "chest";
            chest.top = `${squareSize/5}px`;
            div.appendChild(chest);
            row.push(div);
            div.room = room;
        });
        allRooms[`Row${col.toString()}`] = row;
        col++;
    });
    allRooms.Row0[0].appendChild(player.img);
    allRooms.Row0[0].room.contents.push(player);
    currentRoom.Room = allRooms.Row0[0].room;
    this.addEventListener("keyup", move);
}

function move(key, entity=player){
    direction = key.keyCode;
    switch(direction){
        // Use hardcoded 0-4 values because this implementation can fit 5 squares into a room
        case 37:
            if(entity.roomPos.X > 0){
                entity.move.bind(entity, "X", -1)();
            }else{
                if(currentRoom.Y > 0){
                    allRooms[`Row${currentRoom.X}`][currentRoom.Y].removeChild(player.img);
                    currentRoom.Room.contents = currentRoom.Room.contents.filter(c => c != entity); // Remove the entity from the current room's contents
                    entity.roomPos.X = 4; // Set it way at the right
                    currentRoom.Y--;
                    currentRoom.Room = floor.changeRoom.bind(floor, currentRoom)(); // Change the currentRoom.Room appropriately
                    currentRoom.Room.contents.push(entity); // And add it to the next room
                    allRooms[`Row${currentRoom.X}`][currentRoom.Y].appendChild(player.img);
                }
            }
            break;
        case 38:
            if(entity.roomPos.Y > 0){
                entity.move.bind(entity, "Y", -1)();
            }else{
                if(currentRoom.X > 0){
                    allRooms[`Row${currentRoom.X}`][currentRoom.Y].removeChild(player.img);
                    currentRoom.Room.contents = currentRoom.Room.contents.filter(c => c != entity);
                    entity.roomPos.Y = 4;
                    currentRoom.X--;
                    currentRoom.Room = floor.changeRoom.bind(floor, currentRoom)();
                    currentRoom.Room.contents.push(entity);
                    allRooms[`Row${currentRoom.X}`][currentRoom.Y].appendChild(player.img);
                }
            }
            break;
        case 39:
            if(entity.roomPos.X < 4){
                entity.move.bind(entity, "X", 1)();
            }else{
                if(currentRoom.Y < rooms-1){
                    allRooms[`Row${currentRoom.X}`][currentRoom.Y].removeChild(player.img);
                    currentRoom.Room.contents = currentRoom.Room.contents.filter(c => c != entity); // Remove the entity from the current room's contents
                    entity.roomPos.X = 0; // Set it way at the left
                    currentRoom.Y++;
                    currentRoom.Room = floor.changeRoom.bind(floor, currentRoom)(); // Change the currentRoom.Room appropriately
                    console.log(currentRoom);
                    currentRoom.Room.contents.push(entity); // And add it to the next room
                    allRooms[`Row${currentRoom.X}`][currentRoom.Y].appendChild(player.img);
                }
            }
            
            break;
        case 40:
            if(entity.roomPos.Y < 4){
                entity.move.bind(entity, "Y", 1)();
            }else{
                if(currentRoom.X < rooms-1){
                    allRooms[`Row${currentRoom.X}`][currentRoom.Y].removeChild(player.img);
                    currentRoom.Room.contents = currentRoom.Room.contents.filter(c => c != entity); // Remove the entity from the current room's contents
                    entity.roomPos.Y = 0; // Set it way at the top
                    currentRoom.X++;
                    currentRoom.Room = floor.changeRoom.bind(floor, currentRoom)(); // Change the currentRoom.Room appropriately
                    currentRoom.Room.contents.push(entity); // And add it to the next room
                    allRooms[`Row${currentRoom.X}`][currentRoom.Y].appendChild(player.img);
                }
            }
            break;
    }
    entity.img.style.left = `${20*entity.roomPos.X}%`;
    entity.img.style.top = `${20*entity.roomPos.Y}%`;
}