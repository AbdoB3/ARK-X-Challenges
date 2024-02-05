//.......................Codewars Challenge.......................

function group(arr) {
    let resArr=[];
    let copyArr=arr.slice();

    for(let i=0;i<copyArr.length;i++){
        let elementArr= []; 
        let currentValue=copyArr[i]

        for(let j=0;j<arr.length;j++){
            if(currentValue===arr[j]){
                elementArr.push(arr[j])
                arr.splice(j,1)
                j--
            }
        }
        if(elementArr.length>0){
           resArr.push(elementArr)
        }
    }
    return resArr
}




