//.......................Codewars Challenge.......................

var number = function(busStops){
    let countIn=0;
    let countOut=0;
    for(let i=0;i<busStops.length;i++){
        countIn+=busStops[i][0]
        countOut+=busStops[i][1]
    }
    return countIn-countOut    
}

console.log(number([[3,0],[9,1],[4,8],[12,2],[6,1],[7,8]]));