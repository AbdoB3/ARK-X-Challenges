//.......................Codewars Challenge.......................

function setReducer(input) {
         while (input.length >= 2) {
            let res=1;
            let tempArr = [];
            for (let i = 0; i < input.length ; i++) {
                if (input[i] === input[i + 1]) {
                    res++;
                } else {
                    tempArr.push(res);
                    res = 1;
                }
            }
            input = tempArr; 
        }
        return input[0];
}

const testArray = [1, 1, 2, 3, 5,5];
console.log(setReducer(testArray)); 


