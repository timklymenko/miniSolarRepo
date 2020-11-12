var express = require('express')
var app = express()

var S = require('string')

// socket
const net = require('net')
var HOST = '127.0.0.1'
var PORT = 5206
var client = new net.Socket()

//delay
const Sleep = require('sleep')

// cors
const cors = require('cors')
app.use(cors())

// API
app.listen(3001, () => {
  console.log('Server running on port 3001')
})

let datalist = []
let temp = 1
let thing = time()

// socketing
client.connect(PORT, HOST, () => {
  console.log(`client connected to ${HOST}:${PORT}`)
})
client.on('data', (data) => {
  function time() {
    let date_ob = new Date()
    let hours = date_ob.getHours()
    let minutes = date_ob.getMinutes()
    let seconds = date_ob.getSeconds()
    return hours + ':' + minutes + ':' + seconds
  }

  tmp = '' + temp
  temp += 1
  time = time()
  tag = 'A1234567890'
  Data = '["' + tmp + '","' + time + '","' + tag + '"]'
  datalist.unshift(Data)
  json = '['
  flag = 0
  datalist.forEach(function (item, index, array) {
    if (flag) json += ','
    json += item
    flag = 1
  })
  json += ']'
  app.get('/data', (req, res, next) => {
    res.send(json)
  })
})

function time() {
  let date_ob = new Date()
  let hours = date_ob.getHours()
  let minutes = date_ob.getMinutes()
  let seconds = date_ob.getSeconds()
  return hours + ':' + minutes + ':' + seconds
}
