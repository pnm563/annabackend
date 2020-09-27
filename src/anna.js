const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient();

var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')
var cors = require('cors')

var path = "/thing"

var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(cors())

app.post(path, (req, res) => {
    res.json(req.apiGateway.event);
})

module.exports = app