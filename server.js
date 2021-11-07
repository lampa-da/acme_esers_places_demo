const {client, syncAndSeed, getUsers,getPlaces, createUser, deleteUser} = require('./db');
const {head, nav} = require('./templates');
const express = require('express');
const app = express(); 
const path =require('path');

app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use(express.urlencoded({extended: false}))
app.use(require('method-override')('_method'))


app.get('/', async(req, res, next)=>{
  try{
    const [users, places] = await Promise.all([
      getUsers(),
      getPlaces()
    ])
    
    res.send(`
    <html>
    ${ head({ title: 'Acme Home' })}
    <body>
    ${ nav({ users, places })}
    <h1>Welcome</h1>
    </body>
    
    </html>
    
    `)
  }
  catch(ex){
    next(ex)
  }
})

app.use('/users', require('./routes/users'))

app.use('/places', require('./routes/places'))

const init = async()=> {
  try{
    await client.connect();
    await syncAndSeed();
    const curly = await createUser({name: 'curly'});
    console.log(curly)
    console.log(await getUsers())
    console.log(await getPlaces())
    await deleteUser(curly.id)
    console.log(await getUsers())
    
    const port =process.env.PORT || 3000
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  
  }
  catch(ex){
    console.log(ex)
  }
};
init();
