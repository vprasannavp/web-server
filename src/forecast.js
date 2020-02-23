const request = require('request');

const forecast = (lat,long,calback) =>{
    // const url =  'https://api.darksky.net/forecast/0aaf3e661d6544b48e5e37dea808ea93/'+lat+','+long;
    const url =  'http://api.weatherstack.com/current?access_key=25c7dd24f03a7c3265f89c1d339b0e8a&query='+lat+','+long;
    console.log(lat,long);
    console.log(url);
    request({
        url,
        json : true
    },
    (error , {body})=>{
   
        if(error){
            calback("No Net" , undefined)
        }
        else if(body.error){
            calback("No data" , undefined)
        }
        else{
console.log(body.current.wind_speed);

            calback(undefined, {
                     temp:body.current.temperature,
             precip : body.current.precip,
            summary : body.current.weather_descriptions,
            wind : body.current.wind_speed
            })
        
    
        }
    
    }
    )
}
module.exports = forecast



