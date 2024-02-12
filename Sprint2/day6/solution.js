//Codewars Challenge

function matrixAddition(a, b){
    let res=[];

    for(let i=0;i<a.length;i++){
        let row=[];
        for(let j=0;j<a.length;j++){
             row.push(a[i][j]+b[i][j])
     
        }
        res.push(row)
    }
    return res
  }


  console.log(matrixAddition(  
  [ [1, 2, 3],
    [3, 2, 1],
    [1, 1, 1] ],
//      +
  [ [2, 2, 1],
    [3, 2, 3],
    [1, 1, 3] ]
    ));