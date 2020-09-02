import { arrDupe } from "./helpers.js";
import { controller } from "./controller.js";
import { TILE_SIZE, tiles, map} from "./map.js";

(() => {

    /////// CANVAS ///////////

    let buffer = document.createElement('canvas').getContext('2d');
    let display = document.querySelector('canvas').getContext('2d');
    let scoreboard = document.querySelector('p');

    ///////// PLAYER /////////

    export let snake = {

        body: [520,521],
        head: 520,

    };

    function reset(){

        for (let i = 0; i < snake.body.length; i++){
            map.tiles[snake.body[i]] = 0
        }
        snake = {

            body: [520,521],
            head: 520,
    
        };

        controller.direction = '';
        timeStep = 250;
        stepReference = timeStep;
        controller.boost = false;
    }

    ///////////// PLACE FOOD FUNCTION //////////////
    function placeFood(){
        let arIndex = Math.floor(Math.random() * (map.rows * map.columns)); // find random index in map
        
        while(map.tiles[arIndex] === 1 || arIndex === snake.head || arIndex === snake.body[snake.body.length - 1]){
            
            arIndex++; // add 1 to index if the index is part of the snake
        };
        if(arIndex >= map.rows * map.columns){
            
            arIndex = 0; // set index to 0 if index out of range
        }
        
        map.tiles[arIndex] = 2; // set the tile value to 2 for the food 
    };

    ////////// EAT FOOD ////////////

    function ateFood(){
        if (map.tiles[snake.head] === 2){
            return true
        }
    };

    ////// GAME OVER /////////
    function gameOver(){
        alert(`GAME OVER!!! \nYour score: ${score}`)
    }

    /////////GAME LOOP/////////

    let timeStep = 250;
    let stepReference = timeStep; // used to go back to regular time after boosting
    let accumTime = window.performance.now();
    let score;

    function loop(timestamp){

        score = snake.body.length - 2;
        controller.boost ? timeStep = stepReference * 0.2 : timeStep = stepReference;

        if( timestamp >= accumTime + timeStep){
            accumTime = timestamp;

            /////////////// LEFT WALL COLLISION /////////////
            if(controller.direction === 'l' && snake.head % map.columns === 0){
                
                gameOver();
                reset();

            }
            
            let tail = snake.body[snake.body.length - 1]
            
            ///////// MOVEMENT ////////
            if (controller.direction){
                let lostIndex = snake.body.pop();

                if(controller.direction === 'l'){
                    
                    if (snake.body[1] === snake.head - 1){ 
                        /* make sure snake doesn't eat itself 
                            if buttons press too fast
                        */
                        controller.direction = 'r';
                    } else {
                        map.tiles[lostIndex] = 0;
                        snake.body.unshift(snake.head - 1)
                    }
                    
                }
    
                if(controller.direction === 'u'){
                    
                    if(snake.body[1] === snake.head - map.columns){
                        controller.direction = 'd';
                    } else {
                        map.tiles[lostIndex] = 0;
                        snake.body.unshift(snake.head - map.columns);
                    }
                    
                }
    
                if(controller.direction === 'r'){

                    map.tiles[lostIndex] = 0;
                    
                    if (snake.body[1] === snake.head + 1){ 
                        snake.body.unshift(snake.head - 1);
                        controller.direction = 'l';
                    } else {
                        
                        snake.body.unshift(snake.head + 1);
                    }
                    
                }
    
                if(controller.direction === 'd'){
                    map.tiles[lostIndex] = 0;
                    if(snake.body[1] === snake.head + map.columns){
                        
                        controller.direction = 'u';
                        snake.body.unshift(snake.head - map.columns);
                    } else {
                        snake.body.unshift(snake.head + map.columns);
                    }
                    
                }
            }
            
            snake.head = snake.body[0];

            if(ateFood()){
                snake.body.push(tail);
                placeFood();

                if (controller.boost){
                    stepReference *= .95;
                    timeStep = stepReference;
                } else {
                    timeStep *= .95;
                    stepReference = timeStep;
                }
                
            };

            /////////// BODY COLLISION///////////////
            if(arrDupe(snake.head, snake.body)){
                gameOver();
                reset();
            }

            /////////////// RIGHT WALL/////////////
            if(controller.direction === 'r' && snake.head % map.columns === 0){
                gameOver();
                reset();

            }

            if(snake.head < 0 || snake.head > map.columns * map.rows){
                gameOver();
                reset();

            }

            tileAlter();
            renderTiles();
            renderDisplay();
            
        };
        if (snake.body.length >= map.rows * map.columns){
            alert('CONGRATULATIONS!! \n YOU HAVE WON!!');
            reset();
        };

        scoreboard.innerHTML = `Score: ${score}`;
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
    placeFood();
    renderTiles();
    renderDisplay();

    window.addEventListener('resize', resize);
    window.addEventListener('keydown', controller.keyStrokes);
    window.addEventListener('keydown', controller.boostKey);
    window.addEventListener('keyup', controller.boostKey);

    resize();
    window.requestAnimationFrame(loop)
})()