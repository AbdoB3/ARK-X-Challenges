const http = require('http')
const url = require('url');

const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
    { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
    { name: 'Rome', lat: 41.9028, lng: 12.4964 },
    { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
    { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
  ];

const server = http.createServer(async(req,res)=>{
    try{
        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        const query = parsedUrl.query;
        const city=query.city
        const cityObj=cities.find((e=>e.name.toLowerCase()==city))
        
        if (path === '/weather') {
            try{    
                if (cityObj) {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    console.log(cityObj.name)
                    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityObj.lat}&longitude=${cityObj.lng}&current_weather=true`);
                    const data = await response.json();
                    res.end(`The temperature off ${city} is ${data.current_weather.temperature}`);  
                }else{
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end(`${city} not found`);
                } 

            }catch(fetchError){
                console.error('Error fetching weather data:', fetchError.message);
            }
        }
    }catch(err){
        console.log('sat 3andk error',err.message)
    }
   
})

server.listen(3000,()=>{
    console.log('Server is listening on port 3000');
})