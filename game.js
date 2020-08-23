(() => {

    /////// CANVAS ///////////

    let buffer = document.createElement('canvas').getContext('2d');
    let display = document.querySelector('canvas').getContext('2d');

    //////////CONTROLLER/////////
    let controller = {

        direction: '',
    
        keyStrokes: (e) => {
    
            switch(e.keyCode){
    
                case 37: controller.direction = 'l'; break;
                case 65: controller.direction = 'l'; break;
    
                case 38: controller.direction = 'u'; break;
                case 87: controller.direction = 'u'; break;
    
                case 39: controller.direction = 'r'; break;
                case 68: controller.direction = 'r'; break;
    
                case 40: controller.direction = 'd'; break;
                case 83: controller.direction = 'd'; break;
            }
        }

    }


    //////////MAP///////////

    let TILE_SIZE = 15;

    let tiles = {
        0: {color: '#ff0000'},
        1: {color: '#0000ff'}
    };

    let map = {

        columns: 45,
        rows: 23,
        height: 23 * TILE_SIZE,
        width: 45 * TILE_SIZE,
        widthHeightRatio: 45 / 23,

        tiles: new Array(45 * 23).fill(0) // 1d tile map

    };

    ///////// PLAYER /////////

    let snake = {

        body: [520,521],
        head: 500,
        tail: 501

    };

    /////////GAME LOOP/////////

    function loop(timestamp){

        console.log(controller.direction);
        tileAlter();
        renderTiles();
        
        window.requestAnimationFrame(loop)
    };

    function tileAlter(){
        for (let i = 0; i < snake.body.length; i++){
            map.tiles[snake.body[i]] = 1;
        };
    };
    

    
    function renderTiles(){
        
        let mapIndex = 0;

        for (let top = 0; top < map.height; top += TILE_SIZE){

            for (let left = 0; left < map.width; left += TILE_SIZE){

                let tileValue = map.tiles[mapIndex];
                let tile = tiles[tileValue];
                
                // buffer.strokeStyle = "#ffffff";
                // buffer.lineWidth = 1;
                buffer.fillStyle = tile.color;
                buffer.fillRect(left+1, top+1, TILE_SIZE-1, TILE_SIZE-1);
                // buffer.fill()
                // buffer.stroke()
               
                mapIndex++;
            }
            
        }
    };

    function renderDisplay() {
        
        display.drawImage(buffer.canvas, 0, 0)

    };

    function resize(event){

        var height = document.documentElement.clientHeight;
        var width = document.documentElement.clientWidth;
    
        if (width / height < map.widthHeightRatio){
            height = Math.floor(width / map.widthHeightRatio);
            
        } else {
            width = Math.floor(height * map.widthHeightRatio);
            
        };
        
        display.canvas.style.height = height - 100 + 'px';
        display.canvas.style.width = width - 100 + 'px';
        
    
    };
    
    buffer.canvas.width = display.canvas.width = map.width 
    buffer.canvas.height = display.canvas.height = map.height

    buffer.imageSmoothingEnabled = display.imageSmoothingEnabled = false;
    
    tileAlter();
    renderTiles();
    renderDisplay();

    window.addEventListener('resize', resize);
    window.addEventListener('keydown', controller.keyStrokes);

    resize();
    window.requestAnimationFrame(loop)
})()