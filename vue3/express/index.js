const express = require('express');
const path = require('path');
const parseUploadFile = require('./uploadFile');
const app = express();
const port = 3000;

// 服务器端设置允许跨域请求
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // website
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // cors method
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // content type
    // res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);

app.get('/', (req, res) => {
    res.send('Hello express !!!');
})

app.post('/upload', (req, res) => {
    parseUploadFile.parse(req, res);
});

app.post('/merge', async (req, res) => {
    const fileData = await parseUploadFile.receiveFileData(req, res);
    const { filename, filesize, fileDirHash } = fileData;
    const filePath = path.resolve(__dirname, `${fileDirHash}`);
    const extName = path.extname(filename);
    parseUploadFile.mergeChunk(fileDirHash, extName);
    res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
    res.end(JSON.stringify({
        status: 0,
        message: 'file merge successfully',
        data: null
    }));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))