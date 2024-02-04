const fs = require('fs');

function writeFileAsync(path,content){
    return new Promise((resolve,reject)=>{
    fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
        if (err) {
            reject(err); // Reject the promise with the error
        } else {
            resolve(); // Resolve the promise if successful
        }
    }
    )
      });
}

const processFiles = ()=>{
    fs.readFile('demofile1.html', function(err, data) 
}