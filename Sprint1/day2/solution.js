//.......................Codewars Challenge.......................

function digitalRoot(n) {
    let res = 0
    let arrN = n.toString();
    for (let i = 0; i < arrN.length; i++) {
        res += parseInt(arrN[i])
    }
    while (res > 9) {
        let newRes = 0
        let sumString = res.toString();
        for (let num of sumString) {
            newRes += parseInt(num);
        }
        res = newRes;
    }
    return res
}




//.......................Daily Challenge.......................


//Fetch User Data
const fetchUserData = async () => {
    const res = await fetch('https://dummyjson.com/users')
    const pers = await res.json();
    return pers.users;
}


//Process Data
const processUserData = async () => {
    const data = await fetchUserData();
    const maleUsers=data.filter((gender)=>gender.gender=='male')
    return console.log(maleUsers.map(({firstName,age }) => ({firstName ,age })))
}

//Summarize Data
const summarizeAge = async () => {
    const data = await fetchUserData();
    const maleUsers=data.filter((gender)=>gender.gender=='male')
    let resu = maleUsers.reduce((accumulator, user) =>  accumulator + user.age, 0 )
    console.log(`Total age of male Users:${resu}`);
}

//Display Results
(async () =>{
    const processedData = await processUserData();
    const totalAge  = await summarizeAge();
})();
