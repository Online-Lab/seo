var gzippo = require('gzippo')
var express = require('express')
var app = express()

//app config
app.set('port', (process.env.PORT || 5001))

app.use(gzippo.staticGzip(__dirname))

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
