const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')
const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express();


//Define Path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup Handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))  // Way to customeize your server


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Aditya'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Aditya'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help:'For more information please contact the helpdesk',
        title:'help',
        name:'Aditya'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send('PLease provide the address property')
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
             return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                console.log(error)
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
        })
    })

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'must provide a search tern'
            
        })
    }
        res.send({
        products:[]
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Help Article Not Found',
        name:'Aditya'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'My 404 Page',
        name:'Aditya'
    })
})

app.listen(3000,()=>
{
    console.log('Server is up on port 3000')   //Asynchonous function
})