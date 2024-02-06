const readline = require('readline');

// Create the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


let contacts=[]
const choises= ()=> ['add','list','search','exit'].forEach((x=>console.log(x)))

const trait = () =>{
    choises()
    rl.question(`Choose an action `, (choise) => {
        if(!choise.trim().length<=0){
            switch(choise){
                case 'add':
                    addContact()
                    break;
                case 'list':
                    listContact();
                    break;  
                case 'search':
                    searchContact();
                    break;
                case 'exit':
                    rl.close();
                default:
                    rl.close();
            }   
        }
        });
}

const addContact= ()=>{
    rl.question(`entrer le nom `,(nom)=>{
        rl.question(`entrer le numero `,(num)=>{
            contacts.push({nom,num})
            trait()
        })
    })
}


const listContact =()=>{
    contacts.forEach((item)=>console.log(item));
    trait();
}

const searchContact =()=>{
    rl.question('entrer le nom a chercher ',(name)=>{
       const contactTrouver= contacts.find(item=>item.nom===name)
       if(contactTrouver){
        console.log(contactTrouver)
       }
       
    trait()
    
    })
}

rl.on('close',()=>{
    console.log('good luck have a good day')
})

trait();