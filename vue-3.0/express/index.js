const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world!');
})
app.post('/upload', (req, res) => {
    req.on('data', function(data) {
        // 如何解析Buffer
        // let message = JSON.parse(data);
        console.log(data)
    })
    res.header('Access-Control-Allow-Origin', '*')
    res.send('Got a Post request')
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))