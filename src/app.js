let express = require('express');
let path = require('path')


let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/new_visitor', function(req, res) {
    res.render('new_visitor');
});

app.listen(3000, function() {
    console.log('Listening on port 3000...')
})