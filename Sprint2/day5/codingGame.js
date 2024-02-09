// game loop

while (true) {
    let max=0;
    let index=0;
    for (let i = 0; i < 8; i++) {
        
        if(mountainH > max){
            max=mountainH;
            index=i;
        }
        
    }
    console.log(index);     // The index of the mountain to fire on.
}
