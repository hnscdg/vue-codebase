const path = require('path');
const multiparty = require('multiparty');
const UPLOAD_DIR = path.resolve(__dirname, 'uploadFile')

const parse = (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fileds, files) => {
        if(err) return;

        // console.log(files);
        // console.log('................')
        console.log(fileds);

    })
}

module.exports = {
    parse
}