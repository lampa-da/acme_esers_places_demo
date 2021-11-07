const {getUsers, getPlaces, createUser, deleteUser} = require('../db');
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
    ${ head({ title: 'Users' })}
    <body>
    ${ nav({ users, places })}
    <form method ='POST'>
      <input name='name' />
      <button>Create</button>
    </form>
    ${users.map(user => `
    <li>
      ${user.name}
      <form method ='POST' action='/users/${user.id}?_method=DELETE'>
      <button>x</button>
    </form>
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

app.post('/', async(req, res, next)=>{
  try{
    await createUser(req.body);
    res.redirect('/users');
  }
  catch(ex){
    next(ex)
  }
})

app.delete('/:id', async(req, res, next)=>{
  try{
    await deleteUser(req.params.id);
    res.redirect('/users');
  }
  catch(ex){
    next(ex)
  }
})

