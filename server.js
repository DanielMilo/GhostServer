const express = require('express');
const bodyParser = require('body-parser');
const app = express();
console.log(process.env);
const port = process.env["ghost-port"];



const https = require('https');
const ghosts = require('./DB/ghosts');
const scores = require('./DB/scores');
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

app.get('/ghosts', ghosts.get);
app.get('/stages/:stageID/ghosts', ghosts.get);


app.post('/ghosts', ghosts.post);
app.post('/stages/:stageID/ghosts', ghosts.post);

app.get('/scores', scores.get);
app.get('/stages/:stageID/scores', scores.get);


app.post('/scores', scores.post);
app.post('/stages/:stageID/scores', scores.post);

//https.createServer(options, app).listen(port);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))