var config = require('./database.config.js');
//console.log(config.database.server)

const express = require('express');
const axios = require('axios');
const https = require('https');
const app = express();
const cors = require('cors');
const fs = require('fs');
let port = 8443;
let useSSL = false;
if (!useSSL) {
    port = 3000;
}
let mysql = require('mysql');



// CONFIGURE APP ---------------------------------------------------------------------------------------------
app.use(cors()); // Enable Cross Origin Resource Sharing
app.use('/store', express.static('store')); // enable serving of static files




// ESTABLISH CONNECTION TO MYSQL-DATABASE ---------------------------------------------------------------------------------------------
var pool = undefined;
function initConnection() {
    pool = mysql.createPool({
        host: config.database.host,
        port: config.database.port,
        user: config.database.user_name,
        password: config.database.user_password,
        database: config.database.database_name,
    });
}
initConnection();





// DATABASE: QUERY ---------------------------------------------------------------------------------------------
function db_query(query, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            callback(err);
            return;
        }
        var sql = query;
        connection.query(sql, [], function (err, results) {
            connection.release(); // always put connection back in pool after last query
            if (err) {
                console.log(err);
                callback(false);
                return;
            }
            callback(results);
        });
    });
}




// ROUTE: / | GET ---------------------------------------------------------------------------------------------
app.get('/', function (req, res) {
    res.json({
        route: 'default',
    });
});



// ROUTE: BOOKS | GET ---------------------------------------------------------------------------------------------
app.get('/api/books', function (req, res) {
    // NO PARAMETERS: GET ALL BOOKS ---------------------------------------------------------------------------------------------
    if (Object.keys(req.query).length === 0) {
        db_query("SELECT * FROM books", (result) => {
            res.json({
                route: 'books',
                type: 'all_books',
                result: result
            });
        });
    } else {
        // AT LEAST ONE ID: GET BOOKS BY ID ---------------------------------------------------------------------------------------------
        if (Object.keys(req.query.id).length > 0) {
            db_query("SELECT * FROM books WHERE ID IN (" + req.query.id + ")", (result) => {
                res.json({
                    route: 'books',
                    type: 'books_by_id',
                    result: result
                });
            });
        }
    }
});

// ROUTE: BOOKS | POST ---------------------------------------------------------------------------------------------
app.post('/api/books', function (req, res) {
    res.send('Posting books');
});






// INITIALIZE SERVER ---------------------------------------------------------------------------------------------
if (useSSL) {
    let sslOptions = {
        key: fs.readFileSync('/etc/letsencrypt/live/shutdown.gallery/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/shutdown.gallery/cert.pem')
    };

    https.createServer(sslOptions, app).listen(port, function () {
        return console.log("SSL connection: Listening on port ".concat(port, "!"));
    });
} else {
    app.listen(port, function () {
        return console.log("Non-SSL connection: Listening on port ".concat(port, "!"));
    });
}