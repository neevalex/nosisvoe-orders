const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.listen(3000, () => console.log('Gator app listening on port 3000!'));