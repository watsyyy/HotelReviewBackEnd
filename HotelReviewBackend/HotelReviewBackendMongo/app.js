require('./api/data/dbConnect.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
var cors = require('cors')

    
var routes = require('./api/routes');

app.set('port', 3000);
app.use(cors())
app.use(function(req, res, next) {
    console.log("Request for ", req.url);
    next();
});

app.use (function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
    next();
   });

   app.delete('/hotels/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded( { 'extended' : false } ));
app.use('/api', routes);

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log("Express listening on port " + port);
});
console.log("Starting the server ");

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://localhost:3000/api/hotels/:hotelID/reviews/.well-known/jwks.json'
    }),

      // Validate the audience and the issuer.
  audience: 'http://localhost:3000/api/hotels/:hotelID/reviews',
  issuer: 'http://localhost:3000/',
  algorithms: ['RS256']
});

app.post('/hotels/:hotelID/reviews', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
  });