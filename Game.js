let floor;
let field = document.getElementById("playingfield");
let allRooms = {}; // A front-end map of the rooms. Move up/down a row when the player goes through a room's top/bottom and left/right when going through the sides. Remember to set either position property to 0 or the calculated max.
const currentRoom = {"X": 0, "Y": 0, "Room": null};
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
            // Bit of a cheap trick; the exit is the reward
            chest.src = room.hasExit ? "resources/exit.svg" : "resources/chest.svg";
            chest.className = "chest";
            chest.top = `${squareSize/5}px`;
            div.appendChild(chest);
            for(let m = Math.ceil(Math.random()*3); m > 0; m--){ // Create one to three monsters per room
                let monster = new Monster();
                monster.img = document.createElement("img");
                monster.img.src = "resources/ghost.svg";
                monster.img.className = "entity";
                monster.img.style.left = `${20*monster.roomPos.X}%`;
                monster.img.style.top = `${20*monster.roomPos.Y}%`;
                div.appendChild(monster.img);
                room.contents.push(monster);
            }
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
            }else if(entity === player){ // Monsters can't exit rooms. R-r-right?
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
            }else if(entity === player){
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
            }else if(entity === player){
                if(currentRoom.Y < rooms-1){
                    allRooms[`Row${currentRoom.X}`][currentRoom.Y].removeChild(player.img);
                    currentRoom.Room.contents = currentRoom.Room.contents.filter(c => c != entity); // Remove the entity from the current room's contents
                    entity.roomPos.X = 0; // Set it way at the left
                    currentRoom.Y++;
                    currentRoom.Room = floor.changeRoom.bind(floor, currentRoom)(); // Change the currentRoom.Room appropriately
                    currentRoom.Room.contents.push(entity); // And add it to the next room
                    allRooms[`Row${currentRoom.X}`][currentRoom.Y].appendChild(player.img);
                }
            }
            
            break;
        case 40:
            if(entity.roomPos.Y < 4){
                entity.move.bind(entity, "Y", 1)();
            }else if(entity === player){
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
    currentRoom.Room.contents.forEach(ent => {
        if(ent === player){
            if(player.roomPos.X == 3 && player.roomPos.Y == 3){ // Jackpot!
                if(currentRoom.Room.hasExit){
                    alert("You have found the exit! Reload to play again!");
                    floor.exit(room.hasExit);
                    window.location.reload(true);
                }else{
                    let reward = currentRoom.Room.chest.empty();
                    if(reward){
                        let wear = confirm(`You have found a chest!\r\nCompared to your current stats, it will give you ${reward.attack - (player.ATT_STAT - player.ATT)} attack and ${reward.defense - (player.DEF_STAT - player.DEF)} defense
                                           \r\nYou are currently wearing:\r\n\t
                                           Weapon: ${player.EQUIPPED.weapon.attack} ATT/${player.EQUIPPED.weapon.defense} DEF\r\n\t
                                           Shield: ${player.EQUIPPED.shield.attack} ATT/${player.EQUIPPED.shield.defense} DEF\r\n\t
                                           Armor: ${player.EQUIPPED.armor.attack} ATT/${player.EQUIPPED.armor.defense} DEF\r\n\t
                                           Helmet: ${player.EQUIPPED.helmet.attack} ATT/${player.EQUIPPED.helmet.defense} DEF\r\nThis is a ${reward.type}`);
                        if(wear){
                            player.EQUIPPED[reward.type.toLowerCase()] = reward;
                        }
                        allRooms[`Row${currentRoom.X}`][currentRoom.Y].childNodes.forEach(elem => {elem.className == "chest" ? elem.remove() : null;});
                    }
                }
            }
        }
        if(ent === entity){
            return;
        }
        if(ent.roomPos.X == entity.roomPos.X && ent.roomPos.Y == entity.roomPos.Y){
            entity.attack.bind(entity, ent)(); // Attack anything on your path!
            if(ent.lives === 0){
                ent.img.remove();
                for(let c of currentRoom.Room.contents){
                    if(c === ent){
                        c = null;
                        delete c;
                    }
                }
                if(player.lives == 0){
                    alert("Whoops, you died! Reload to play again!");
                }
                delete ent;
            }
        }
        });
    if(entity === player){
        let keycodes = [37, 38, 39, 40, 0]; // Chance they won't move
        let hackKey; // Simulate another key, events are read-only
        currentRoom.Room.contents.forEach(ent => {
            // And another! Makes all monsters in the room move into a random direction.
            hackKey = {};
            hackKey.keyCode = keycodes[Math.floor(Math.random() * keycodes.length)];
            (ent === player) ? null : move(hackKey, ent);
            });
    }
    entity.img.style.left = `${20*entity.roomPos.X}%`;
    entity.img.style.top = `${20*entity.roomPos.Y}%`;
}