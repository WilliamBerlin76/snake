export let controller = {

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
    },
    boost: false,

    boostKey: (e) => {
        if(e.keyCode === 32){
            
            if (e.type === 'keyup'){
                controller.boost = false;
            } else {
                controller.boost = true;
            }
        };
        
    }

}