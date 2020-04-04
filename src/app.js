let express = require('express');
let bodyParser = require('body-parser');

let app = express();

let urlencodedParser = bodyParser.urlencoded({extended: false})

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/new_visitor', function(req, res) {
    let data = {age: 29, job: 'programmer'}
    res.render('success', {data: data});
});

app.listen(3000, function() {
    console.log('Listening on port 3000...')
});

// app.post('/new_visitor', urlencodedParser, function(req, res) {
//     console.log(req.body)
//     res.render('/new_visitor', {data: req.body});
// });






