let floor;
let field = document.getElementById("playingfield");
let allRooms = {};
let player;
function init() {
    player = new Player({"X": 0, "Y": 0});
    //Just put all rooms on-screen. You could also display one room and use the Map object as a map.
    let rooms = document.getElementById('roomcount').value;
    floor = new Floor(rooms);
    document.getElementById('mfd').remove();
    Object.keys(floor.MAP.ROOMS).forEach(key => {
        floor.MAP.ROOMS[key].forEach(room => {
            let div = document.createElement("div");
            div.style.minWidth = `${Math.floor(field.getBoundingClientRect().width/Math.sqrt(rooms))-4}px`;
            div.style.minHeight = `${Math.floor(field.getBoundingClientRect().height/Math.sqrt(rooms))-4}px`;
            div.className = "tile";
            div.style.display = "inline-block";
            div.style.border = "2px dashed blue";
            field.appendChild(div);
            allRooms[div] = room; // Object pointers make for valid keys
        });
    });
    field.style.backgroundImage = "url('resources/floor.svg')";
    this.addEventListener("keyup", function(e){
        this.move(e.charCode, player);
    });
}

function move(direction, entity){
    console.log(direction);
    switch(direction){
        case 37:
            entity.move("X", -1).bind(entity);
            break;
        case 38:
            entity.move("Y", -1).bind(entity);
            break;
        case 39:
            entity.move("X", 1).bind(entity);
            break;
        case 40:
            entity.move("Y", 1).bind(entity);
            break;
    }
    console.log(entity);
    return entity;
}