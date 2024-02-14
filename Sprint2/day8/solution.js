//CodeWars challenge

function cakes(recipe,available) {
    let keyInReceipe=0;
    let countEqual=0;
    let minIn=[];
    for (key in recipe){
        keyInReceipe++;
        for(key2 in available){
            if(key==key2){
                if(recipe[key]<available[key]){
                    countEqual++;
                    let last = available[key]/recipe[key]
                    minIn.push(last)
                }
            }
        }
    }
    if(keyInReceipe==countEqual) return Math.floor(Math.min.apply(null, minIn));
    else return false;
    }
 // optimized way
    function cakes(recipe,available) {
        let minIn=[];
        for (ingrediant in recipe){
            if(!(ingrediant in available) || recipe[ingrediant]>available[ingrediant]){
                return 0
            }else{
                let last =available[ingrediant]/recipe[ingrediant]
                minIn.push(last)
            }
        }
        return Math.floor(Math.min.apply(null,minIn))
    }
    

    let recipe = {apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100};
    let available = {sugar: 500, flour: 2000, milk: 2000};
    console.log(cakes(recipe,available));


