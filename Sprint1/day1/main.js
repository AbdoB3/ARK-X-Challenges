// return masked string
function maskify(cc) {
    let char="#"
    if(cc.length>4){
     let ccArr= cc.split('');
      for (let i = 0; i < ccArr.length - 4; i++) {
          ccArr[i] = char;
      }
      cc = ccArr.join('');
    }
    return cc
  }

  