(() => {

    /////// CANVAS ///////////

    let buffer = document.createElement('canvas').getContext('2d');
    let display = document.querySelector('canvas').getContext('2d');

    //////////CONTROLLER/////////
    let controller = {

        direction: '',
    
        keyStrokes: (e) => {
    
            switch(e.keyCode){
    
                case 37: controller.direction !== 'r' ? controller.direction = 'l' : null; break;
                case 65: controller.direction !== 'r' ? controller.direction = 'l' : null; break;
    
                case 38: controller.direction !== 'd' ? controller.direction = 'u' : null; break;
                case 87: controller.direction !== 'd' ? controller.direction = 'u' : null; break;
    
                case 39: controller.direction !== 'l' ? controller.direction = 'r' : null; break;
                case 68: controller.direction !== 'l' ? controller.direction = 'r' : null; break;
    
                case 40: controller.direction !== 'u' ? controller.direction = 'd' : null; break;
                case 83: controller.direction !== 'u' ? controller.direction = 'd' : null; break;
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

        body: [520,521,522,523, 524, 525],
        head: 520,

    };

    function reset(){

        for (let i = 0; i < snake.body.length; i++){
            map.tiles[snake.body[i]] = 0
        }
        snake = {

            body: [520,521,522,523,524,525],
            head: 520,
    
        };

        controller.direction = '';
    }

    function arrDupe(item, arr){
        let count = 0;

        for(let i = 0; i < arr.length; i++){
            arr[i] === item && count++;
            if(count > 1){
                return true;
            }
        };

        return false;
    };

    /////////GAME LOOP/////////

    let timeStep = 300;
    let accumTime = window.performance.now();

    function loop(timestamp){
        
        
        if( timestamp >= accumTime + timeStep){
            accumTime = timestamp;

            /////////////// LEFT WALL COLLISION /////////////
            if(controller.direction === 'l' && snake.head % map.columns === 0){
                alert('you hit a wall');
                reset()
            }
            
            
            ///////// MOVEMENT ////////
            if(controller.direction === 'l'){
                // console.log('huah', snake.body)
                let lostIndex = snake.body.pop();
                map.tiles[lostIndex] = 0;
                snake.body.unshift(snake.head - 1)
                snake.head = snake.body[0];
            }

            if(controller.direction === 'u'){
                let lostIndex = snake.body.pop();
                map.tiles[lostIndex] = 0;
                snake.body.unshift(snake.head - map.columns);
                snake.head = snake.body[0];
            }

            if(controller.direction === 'r'){
                let lostIndex = snake.body.pop();
                map.tiles[lostIndex] = 0;
                snake.body.unshift(snake.head + 1);
                snake.head = snake.body[0];
            }

            if(controller.direction === 'd'){
                let lostIndex = snake.body.pop();
                map.tiles[lostIndex] = 0;
                snake.body.unshift(snake.head + map.columns);
                snake.head = snake.body[0];
            }

            /////////// BODY COLLISION///////////////
            if(arrDupe(snake.head, snake.body)){
                alert('You ate yourself');
                reset();
            }

            /////////////// RIGHT WALL/////////////
            if(controller.direction === 'r' && snake.head % map.columns === 0){
                alert('you hit a wall')
                reset();
            }

            if(snake.head < 0 || snake.head > map.columns * map.rows){
                alert('you hit a wall')
                reset();
            }

            tileAlter();
            renderTiles();
            renderDisplay();
            
        };

        
        window.requestAnimationFrame(loop);
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
                
                buffer.fillStyle = tile.color;
                buffer.fillRect(left+1, top+1, TILE_SIZE-1, TILE_SIZE-1);
               
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