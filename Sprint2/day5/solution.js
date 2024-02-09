//Codewars Challenge 

function onlyDuplicates(str) {
    let frequency = {};
    let arr=str.split('');
    
    arr.forEach(e => {
        if(frequency[e]){
            frequency[e]++
        }else{
            frequency[e]=1
        }
    });
    let res=''
    arr.forEach(function(char) {
        if (frequency[char] > 1) {
            res += char;
        }
    });
    return res;
  }



//Best practice

/*function onlyDuplicates(str) {
    arr=str.split('')
    return arr.filter(e => str.indexOf(e) != str.lastIndexOf(e)).join('')
}*/

  console.log(onlyDuplicates('colloquial'))