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

//...........................................


const fetchUserData = async () => {
    const res = await fetch('https://dummyjson.com/users')
    const pers = await res.json();
    return pers.users;
}

const processUserData = async () => {
    const data = await fetchUserData();
    const maleUsers=data.filter((gender)=>gender.gender=='male')
    return console.log(maleUsers.map(({firstName,age }) => ({firstName ,age })))
}

const summarizeAge = async () => {
    const data = await fetchUserData();
    const maleUsers=data.filter((gender)=>gender.gender=='male')
    let resu = maleUsers.reduce((accumulator, user) =>  accumulator + user.age, 0 )
    console.log(`Total age of male Users:${resu}`);
}

/*(async () =>{
    const processedData = await processUserData();
    const totalAge  = await summarizeAge();
})();
*/
digitalRoot(229);