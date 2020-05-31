// requiring frameworks to use
const Visitors = require('./table')


let express = require('express');
let bodyParser = require('body-parser');
require('dotenv').config({path: '../.env'})
let {Client} = require('pg')



// postgres class that will start the connection
const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
})

let app = express();//starting the program

let urlencodedParser = bodyParser.urlencoded({extended: false})//for viewing express on a pug template

app.set('view engine', 'pug');
app.use('/css', express.static('css'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// posting to new visitor path to render the html form data
app.post('/new_visitor', urlencodedParser, async function(req, res) { 
  let table = new Visitors()
  
  
    // calling the addNewVisitor function
    let addNew = await table.addVisitor(
      req.body.name,
      req.body.age,
      req.body.date,
      req.body.time,
      req.body.assistedby,
      req.body.comments
      )
      console.log(addNew)
      res.render('successful', 
      {
        data: addNew[0],
      });

      
    
});

app.listen(3000, function() {
  console.log('Listening on port 3000...')
});






