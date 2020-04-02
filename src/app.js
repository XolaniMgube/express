let express = require('express');
let bodyParser = require('body-parser');
let path = require('path')
let app = express();

let urlencodedParser = bodyParser.urlencoded({extended: false})


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/new_visitor', function(req, res) {
    res.render('new_visitor');
});

app.listen(3000, function() {
    console.log('Listening on port 3000...')
});

app.post('/new_visitor', urlencodedParser, function(req, res) {
    console.log(req.body)
    res.render('/new_visitor', {data: req.body});
});



// async function viewTable() {
//     await client.connect()
//     console.log("Connected successfully.")
//     const results = await client.query("select * from visitor")
//     console.table(results.rows)
//     await client.end()
//     console.log("Client disconnected successfully.")
// }

// async function addVisitor(name, age, date, time, assistedBy, comments) {
//     try{
//         await client.connect()
//         await client.query("BEGIN")
//         await client.query("insert into visitors (visitorname, visitorage, dateofvisit, timeofvisit, comments) values ($1, $2, $3, $4, $5, $6))", [name, age, date, time, assistedBy, comments])
//         console.log("Inserted a new row")
//         await client.query("COMMIT")
//     }
//     catch(ex){
//         console.log("Failed to add visitor " + ex)
//     }
//     finally{
//         await client.end()
//         console.log("script closed")
//     }
// }



