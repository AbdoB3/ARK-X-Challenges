const fs= require('fs')

  
function selectRandomCity(cities) {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  }


const read = async()=>{
    try {
        const data = fs.readFileSync('input.txt', 'utf8');
        const cities = JSON.parse(data);
        const myCity = selectRandomCity(cities);
        const lat = myCity.lat;
        const lng = myCity.lng;
    
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
        const responseData = await response.json();
    
        const content = `${myCity.name}: ${responseData.current_weather.temperature} °C`;
        if (fs.existsSync(`${myCity.name}.txt`)) {
            fs.unlinkSync(`${myCity.name}.txt`);
            console.log('file deleted')
        } 
        fs.writeFileSync(`${myCity.name}.txt`, content);
        console.log('File created successfully.');
        
        console.log(myCity.name);
    } catch (err) {
        console.error('Error:', err);
    }
    
}

  read();