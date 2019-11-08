let floor;
let field = document.getElementById("playingfield");
let allRooms = {}; // A front-end map of the rooms. Move up/down a row when the player goes through a room's top/bottom and left/right when going through the sides. Remember to set either position property to 0 or the calculated max.
let rooms; // Number of rooms in a row/column. These are the same.
let player;
let squareSize; // Size of a square containing an Entity. Used to calculate when to swap rooms.
function init() {
    rooms = document.getElementById('roomcount').value;
    player = new Player({"X": 0, "Y": 0});
    player.img = document.createElement("img");
    player.img.src = "resources/player.svg";
    player.img.id = "player";
    player.img.className = "entity";
    let width = Math.floor(field.getBoundingClientRect().width/Math.sqrt(rooms))-4; // Calculate the optimal width, account for borders
    let height = Math.floor(field.getBoundingClientRect().height/Math.sqrt(rooms))-4; // Dito for the height
    // Do not question the power of inline if statements.
    //height > width ? function(){player.img.style.width = width/10; player.img.style.height = width/10;}.bind(this)() : function(){player.img.style.width = height/10; player.img.style.height = height/10;}.bind(this); // this is a long and ugly line. But it's functional and that's all that matters!
    //Just put all rooms on-screen. You could also display one room and use the Map object as a map.
    floor = new Floor(rooms);
    document.getElementById('mfd').remove();
    let rowNum = 0;
    Object.keys(floor.MAP.ROOMS).forEach(key => {
        let row = [];
        floor.MAP.ROOMS[key].forEach(room => {
            let div = document.createElement("div");
            let chest = document.createElement("img");
            chest.src = "resources/chest.svg";
            chest.style.display = "block";
            chest.left = `${width/2}px`;
            chest.top = `${height/2}px`;
            div.style.width = `${width.toString()}px`; // Make it fill the playingfield
            div.style.height = `${height.toString()}px`; // Dito for height
            div.className = "tile";
            div.appendChild(chest);
            field.appendChild(div);
            row.push(div);
            div.room = room;
        });
        allRooms[`Row${rowNum.toString()}`] = row;
        rowNum++;
    });
    allRooms.Row0[0].appendChild(player.img);
    allRooms.Row0[0].room.contents.push(player);
    field.style.backgroundImage = "url('resources/floor.svg')";
    this.addEventListener("keyup", move);
}

function move(key, entity=player){
    direction = key.keyCode;
    switch(direction){
        case 37:
            entity.move.bind(entity, "X", -1)();
            return entity;
        case 38:
            entity.move.bind(entity, "Y", -1)();
            return entity;
        case 39:
            entity.move.bind(entity, "X", 1)();
            return entity;
        case 40:
            entity.move.bind(entity, "Y", 1)();
            return entity;
    }
}