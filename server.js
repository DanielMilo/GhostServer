const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 9443;

const https = require('https');

const ghosts = require('./DB/ghosts');
/*
const options = {
    pfx: fs.readFileSync('test/fixtures/test_cert.pfx'),
    passphrase: 'sample'
  };*/

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

app.get('/', function(req,res){
    res.send("API Is alive!");
})

app.get('/Ghosts', ghosts.get);


app.post('/Ghosts', ghosts.post);

//https.createServer(options, app).listen(port);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))