let express = require('express');
let bodyParser = require('body-parser');
// let pug = require('pug')

const {Client} = require('pg')
const client = new Client({
  user: "user",
  password: "pass",
  host: "localhost",
  port: "5432",
  database: "db"
})

let app = express();

let urlencodedParser = bodyParser.urlencoded({extended: false})

app.set('view engine', 'pug');
app.use('/css', express.static('css'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/new_visitor', urlencodedParser, function(req, res) { 

    res.render('successful', {data: req.body});

    async function addVisitor(name, age, date, time, assistedBy, comments) {
      try{
        await client.connect()
        await client.query("BEGIN")
        await client.query("insert into visitors (name, age, date, time, assistedby, comments) values ($1, $2, $3, $4, $5, $6)", [name, age, date, time, assistedBy, comments])
        console.log("Inserted a new row")
        let id = await client.query("select * from visitors where id = 1")
        console.table(id.rows)
        await client.query("COMMIT")
        await client.end()
      }
      catch(ex){
        console.log("Failed to add visitor " + ex)
      }
      finally{
        
        console.log("script closed")
      }
    }

    // async function viewTable(){
    //   await client.connect()
    //   console.log("Connected successfully.")
    //   const results = await client.query("select * from visitors")
    //   console.table(results.rows)
    //   await client.end()
    //   console.log("Client disconnected successfully.")
    // }

    // viewTable()

    addVisitor(
      // req.body.id,
      req.body.name,
      req.body.age,
      req.body.date,
      req.body.time,
      req.body.assistedby,
      req.body.comments
      )
});

app.listen(3000, function() {
  console.log('Listening on port 3000...')
});





