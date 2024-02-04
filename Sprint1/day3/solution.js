//.......................Codewars Challenge.......................

function isIsogram(str){
    lower=str.toLowerCase();
    arrS=lower.split('');
   for(i=0;i<arrS.length;i++){
    for(j=i+1;j<arrS.length;j++){
        if (arrS[i] === arrS[j]) {
            return false; 
        }
    }
   }
   return true
  }