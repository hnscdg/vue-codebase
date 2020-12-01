const http = require('http');
const server = http.createServer();

// const server = http.createServer(function(request, response) {
    //     // sent HTTP header
    //     // HTTP status: 200 OK
    //     // content type text/plain
    //     response.writeHead(200, {'Content-Type': 'text/plain' });
    
    //     // send "hello world"
    //     response.end('hello nodejs');
    // })
    
server.on('request', (req, res) => {
    res.write('hello')

    res.write(' nodejs\n')

    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Headers", "*");

    let url = req.url;

    if(url === '/'){
        res.end('home');
    } else if(url == '/upload') {
        res.end('upload');
    } else {
        res.end('404');
    }
    
    // if(req.method === 'OPTIONS') {
    //     res.status = 200;
    //     res.end("OPTIONS successed");
    //     return;
    // }
    // if(req.method === 'POST') {
    //     switch(req.url) {
    //         case '//upload':
    //             console.log('req:' + req);
    //             console.log('res:' + res);
    //             break;
    //         case '//merge':
    //             break;
    //         case '//verify':
    //             break;
    //         default:
    //             break;
    //     }
    // }
})

const PORT = 3000;
server.listen(PORT, () => { console.log('server running at port:' + PORT ) });