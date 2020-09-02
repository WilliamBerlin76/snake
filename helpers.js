export function arrDupe(item, arr){
    let count = 0;

    for(let i = 0; i < arr.length; i++){
        arr[i] === item && count++;
        if(count > 1){
            return true;
        }
    };

    return false;
};
