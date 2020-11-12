var express = require('express')
var app = express()

var S = require('string')

// socket
const net = require('net')
var HOST = '127.0.0.1'
var PORT = 5205
var client = new net.Socket()

// cors
const cors = require('cors')
app.use(cors())

// API
app.listen(3000, () => {
  console.log('Server running on port 3000')
})

// socketing
client.connect(PORT, HOST, () => {
  console.log(`client connected to ${HOST}:${PORT}`)
})
// while (1) {
client.on('data', (data) => {
  Data = S(data).trim() + '-' + time()
  console.log(`Client received: ${Data}`)
  app.get('/data', (req, res, next) => {
    res.json([Data])
  })
})

function time() {
  let date_ob = new Date()
  let hours = date_ob.getHours()
  let minutes = date_ob.getMinutes()
  let seconds = date_ob.getSeconds()
  return hours + ':' + minutes + ':' + seconds
}
