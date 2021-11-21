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
app.use(cors());

app.get('/', function (req, res) {
    res.json({
        status: 'Server is live',
        entryPoint: 'global'
    })
});

// app.get('/', function (req, res) {
//     axios
//         .get(req.query.site)
//         .then((response) => {
//             res.setHeader('Content-Type', 'text/plain');
//             res.send(response.data);
//         })
//         .catch((error) => {
//             res.setHeader('Content-Type', 'text/plain');
//             res.send(error);
//         });
// });

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