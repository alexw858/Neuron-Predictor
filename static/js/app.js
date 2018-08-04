var cell = '';
var update = '';

setInterval(()=>{
    cell = $("#iframe").contents().find("#cell").text()

    if (cell != '' && cell != update) {
        rotation_x = Math.floor(Math.random()*10)/10
        rotation_y = Math.floor(Math.random()*10)/10
        rotation_z = Math.floor(Math.random()*10)/10
        init2();
        animate2();
    }
    update = cell
}, 1000)

