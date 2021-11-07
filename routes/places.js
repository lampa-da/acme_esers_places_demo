const { getUsers,getPlaces} = require('../db');
const {head, nav} = require('../templates');
const app =require('express').Router();

module.exports = app;



app.get('/', async(req, res, next)=>{
  try{
    const [users, places] = await Promise.all([
      getUsers(),
      getPlaces()
    ])
    
    res.send(`
    <html>
    ${ head({ title: 'Places' })}
    <body>
    ${ nav({ users, places })}
    ${places.map(place => `
    <li>
      ${place.name}
    </li>
    `).join('')}
    </body>
    
    </html>
    
    `)
  }
  catch(ex){
    next(ex)
  }
})


