//Codewars Challenge

function narcissistic(value) {
    let toStr = value.toString();
    let len=toStr.length;
    let res=0;
    for(let i in toStr){
        res+=parseInt(toStr[i]**parseInt(len))
    }
    if(value==res)return true;
    return false
  }  
  console.log(narcissistic(79));