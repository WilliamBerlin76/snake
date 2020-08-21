(() => {


    let buffer = document.createElement('canvas').getContext('2d');
    let display = document.querySelector('canvas').getContext('2d');

    //////////MAP///////////

    let TILE_SIZE = 5;

    let tiles = {
        0: {color: '#ff0000'}
    }

    let map = {

        columns: 16,
        rows: 25,
        height: 25 * TILE_SIZE,
        width: 16 * TILE_SIZE,
        widthHeightRatio: 16 / 25,

        tiles: new Array(16 * 25).fill(0) // 1d tile map

    };

    function renderTiles(){

        let mapIndex = 0;

        for (let top = 0; top < map.height; top += TILE_SIZE){

            for (let left = 0; left < map.width; left += TILE_SIZE){

                let tileValue = map.tiles[mapIndex];
                let tile = tiles[tileValue];
                
                buffer.strokeStyle = "#ffffff";
                buffer.lineWidth = 1;
                buffer.fillStyle = tile.color;
                buffer.rect(top, left, TILE_SIZE, TILE_SIZE);
                buffer.fill()
                buffer.stroke()

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
        
        if (width <= 800){
            display.canvas.style.height = height - 50 + 'px';
            display.canvas.style.width = width - 50 + 'px';
        } else {
            display.canvas.style.height = height - 200 + 'px';
            display.canvas.style.width = width - 200 + 'px';
        }
    
    };
    
    buffer.canvas.width = display.canvas.width = map.width 
    buffer.canvas.height = display.canvas.height = map.height

    buffer.imageSmoothingEnabled = display.imageSmoothingEnabled = false;
    
    
    renderTiles();
    renderDisplay();

    window.addEventListener('resize', resize);

    resize();
    
})()