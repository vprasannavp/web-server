const path = require('path');
const express = require('express');
const geocode = require('./src/geocode');
const forecast = require('./src/forecast');

const app = express()
const port = process.env.PORT || 3000


const hbs = require('hbs');
const app = express();
const pubDir = path.join(__dirname,"./public");
const templateDir = path.join(__dirname,"./templates/views");
const partialsDir = path.join(__dirname,"./templates/partials");
app.set('view engine','hbs');
app.set('views',templateDir)
hbs.registerPartials(partialsDir);
app.use(express.static(pubDir));

app.get('',(req,res) => {
res.render('index',({
    title:'home',
    name:'test val appu'
}));
});

app.get('/help',(req,res) => {
    res.render('help',({
        title:'help',
        helpText:'sample data',
        name:'test val appu'
    }));
    });

app.get('/product',(req,res)=>{
    if(!req.query.name){
       return res.send({
            error:"no query"
        })
    }
        console.log(req.query);
        res.send({
            products:[]
        })
    

})


    app.get('/about',(req,res) => {
        res.render('about',({
            title:'about test',
            name:'test val appu'
        }));
        });
    


        app.get('/weather', (req, res) => {
            if (!req.query.address) {
                return res.send({
                    error: 'You must provide an address!'
                })
            }
        
            geocode(req.query.address,(error,{lat,long,place}) =>{

                if(error){
                 return res.send({error})
                }
            
                forecast(lat, long, (error, {temp, precip : newprecip,summary}) => {
                  if(error){
                    return res.send({error})
                   }
              
                    return res.send({
                        address:place,
                        temp,
                        newprecip,
                        summary
                    })
                  })
              
              });
        })
        
app.get('/help/*',(req,res) => {
    res.render('404',({
        title:'Help 404 page',
        errorMessage:'This is an help 404 page'
    }))
})

app.get('*',(req,res) => {
  res.render('404',({
      title:'404 page',
      errorMessage:'This is an 404 page'
  }))
})



app.listen(port , () =>{
    console.log("Test Server");
})