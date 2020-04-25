const express = require('express');
const app = express();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)


db.defaults({ orders: [], user: {}, count: 0 })
  .write()

app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));

app.engine('html', require('ejs').renderFile);

app.get('/add', (req, res) => {
    
    if (req.query.name) {
        console.log('Add: ');
        console.log(req.query);
        req.query.id = db.get('orders').value().length + 1;
        req.query.date = Date.now();

      db.get('orders').push(req.query).write();
      res.sendStatus(200);
    }
});

app.get('/get', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(db.get('orders').value());
});



app.get('/order', function (req, res) {

  order = db.get('orders').find({ id: parseInt(req.query.id) }).value();

  let date_ob = new Date(order.date);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  
  // prints date & time in YYYY-MM-DD format
  formattedTime = year + "-" + month + "-" + date;

  console.log(order);
  res.render(__dirname + "/public/order.html", {order , date: formattedTime});

});



app.listen(3000, () => console.log('Gator app listening on port 3000!'));