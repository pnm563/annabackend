const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient();

var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')
var cors = require('cors')

var path = "/thing"


AWS.config.update({ region: 'eu-west-2' });

let tableName = 'CountryFlags';

var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(cors())

app.post(path, (req, res) => {
    res.json(req.apiGateway.event);
})

app.get('/test', (req,res) =>{
    res.json({"Thanks for that":"test"});
})

app.get('items', (req, res) => {
    let queryParams = {
      TableName: tableName,
      KeyConditionExpression: "#flagType = :flag",
      ExpressionAttributeNames:
      {
        "#flagType": "FlagType"
      },
      ExpressionAttributeValues:
      {
        ":flag": "CountryFlag"
      },
  };
  
    dynamodb.query(queryParams, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({error: 'Could not load items: ' + err});
      } else {
        res.json({items: data.Items});
        //res.json(req.apiGateway.event)
      }
    });
  })

module.exports = app