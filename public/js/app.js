
    const weatherButton = document.querySelector('form');
const location_inpu = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const  msg2 = document.querySelector('#msg-2');

weatherButton.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log("hey i was clicked");
    console.log(location_inpu.value);
    document.querySelector('#msg-1').innerHTML="Loading ....";
    fetch('http://localhost:3000/weather?address='+location_inpu.value).then((res) => {
        res.json().then((data) =>{
         if(data.error){

             document.querySelector('#msg-1').innerHTML=data.error;
             document.querySelector('#msg-1').innerHTML="";
         }else{
            console.log(data.address);
            console.log(data.summary[0]);
            document.querySelector('#msg-1').innerHTML="Address : "+data.address;
            document.querySelector('#msg-2').innerHTML="Summary : "+data.summary[0];
         }
         
        } )
    })
})