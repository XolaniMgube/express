// let express = require('express');
// let bodyParser = require('body-parser');
// let pug = require('pug')

const {Client} = require('pg')
const client = new Client({
  user: "user",
  password: "pass",
  host: "postgres",
  port: "5432",
  database: "db"
})

// let app = express();

// let urlencodedParser = bodyParser.urlencoded({extended: false})

// app.set('view engine', 'pug');
// app.use('/css', express.static('css'))

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

// app.listen(3000, function() {
//     console.log('Listening on port 3000...')
// });

// app.post('/new_visitor', urlencodedParser, function(req, res) {
//     console.log(req.body)
//     res.render('successful', {data: req.body});
// });

// function wedo() {
//     console.log("ok bruh")
// }

// wedo()


async function viewTable() {
    await client.connect()
    console.log("Connected successfully.")
    const results = await client.query("select * from visitors")
    console.table(results.rows)
    await client.end()
    console.log("Client disconnect successfully.")
}

async function addVisitor(name, age, date, time, assistedBy, comments) {
  try{
    await client.connect()
    await client.query("BEGIN")
    await client.query("insert into visitors (visitorname, visitorage, dateofvisit, timeofvisit, assistedby, comments) values ($1, $2, $3, $4, $5, $6)", [name, age, date, time, assistedBy, comments])
    console.log("Inserted a new row")
    await client.query("COMMIT")
  }
  catch(ex){
    console.log("Failed to add visitor " + ex)
  }
  finally{
    await client.end()
    console.log("script closed")
  }
}
addVisitor('Xolani', 26, '03-24-2020', '20:00', 'Stuber', 'Ping pong guru after me')
// viewTable()




