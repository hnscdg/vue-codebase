const express = require('express');
const path = require('path');
const fsextra = require('fs-extra');
const parseUploadFile = require('./uploadFile');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello express !!!');
})

app.post('/upload', (req, res) => {
    let reqData = [];
    res.header('Access-Control-Allow-Origin', '*')
    parseUploadFile.parse(req, res);

    // req.on('data', function(data) {
    //     // 如何解析Buffer
    //     reqData.push(data)
    // })

    // req.on('end', () => {
    //     console.log(reqData.length)
    // })

    // res.send('Got a Post request upload')
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))