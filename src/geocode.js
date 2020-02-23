const request = require('request');

const geocode = (address , callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJhc2FubmEtYXBwdSIsImEiOiJjazZqazNvaXYwMmoyM2ZxOHljMmF6MzV3In0.OoVU9Db2OtapKJP2iqVEvw&limit=1';
console.log(url);

    request({url , json:true},(error , data) =>{
                     if(error){

             callback("No Internet",{
                lat : undefined,
                long :undefined,
                place : undefined
                });
         }
         else if(data.body.message === 'Not Found' ){
            callback("Pls type a location",{
                lat : undefined,
                long :undefined,
                place : undefined
                });
         }
         else if(data.body.features[0] === undefined ){

            callback("Data not found",{
                lat : undefined,
                long :undefined,
                place : undefined
                });
       
         }else{
             console.log("my lat"+data.body.features[0].center[1]);
             console.log("my long"+data.body.features[0].center[0]);
                         callback(undefined,{
            lat : data.body.features[0].center[1],
            long :data.body.features[0].center[0],
            place : data.body.features[0].place_name 
            }
                );
         }
        })
}
module.exports = geocode