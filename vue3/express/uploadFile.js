const path = require('path');
const multiparty = require('multiparty');
const UPLOAD_DIR = path.resolve(__dirname, 'uploadFile')
const fsextra = require('fs-extra');
const { extname } = require('path');
const { write } = require('fs');

const parse = (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (err, fileds, files) => {
        if(err) return;

        const [chunk] = files.chunk;
        const [hash] = fileds.hash;
        // const [filename] = fileds.filename;
        const [fileHash] = fileds.fileHash;
        const [fileDirHash] = fileds.fileDirHash;
        const chunkDir = path.resolve(UPLOAD_DIR, fileDirHash);
        const file = path.resolve(chunkDir, `${fileHash}`);
        fsextra.ensureDirSync(chunkDir);

        // fsextra.access 判断文件和目录是否存在
        fsextra.access(file, fsextra.constants.F_OK, (err) => {
            if(err){
                fsextra.moveSync(chunk.path, file);
                res.end(JSON.stringify({
                    message: 'received the chunk',
                    data: {
                        hash: `${hash}`
                    }
                }));
            } else {
                res.end(JSON.stringify({
                    message: 'received the chunk',
                    data: {
                        hash: `${hash}`
                    }
                }));
            }
        });
 
    });
};

const receiveFileData = async (req, res) => {
    let chunk = '';
    return new Promise((resolve, reject) => {
        req.on('data', (data) => {
            chunk += data;
        });
        req.on('end', () => {
            resolve(JSON.parse(chunk));
        });
        req.on('error', (error) => {
            reject(error)
        })
    })
}

/**
 * merge slice chunk
 * @param fileName, @param extName
 */
const mergeChunk = (fileName, extName) => {
    const chunkDir = path.resolve(UPLOAD_DIR, fileName);
    const chunkParts = fsextra.readdirSync(chunkDir);
    const chunkFilePath = path.resolve(UPLOAD_DIR, 'movie');
    fsextra.ensureDirSync(chunkFilePath);
    chunkParts.sort((a,b) => b.split(fileName)[1] -  a.split(fileName)[1]);
    const pipeFileFn = streamMegeRecursive(fileName, extName);
    pipeFileFn(chunkParts);
};

const streamMegeRecursive = (fileName, extName) => {
    const writeFileChunkPath = path.resolve(UPLOAD_DIR, 'movie', `${fileName}${extName}`);
    const writeStream = fsextra.createWriteStream(writeFileChunkPath);
    writeStream.on('finish', () => {
        console.log(`${fileName} finish`)
        fsextra.remove(path.resolve(UPLOAD_DIR, fileName)).then(res => {
            console.log(`file: ${fileName} merge successfully`)
        });
    });
    return function pipeFile(chunkFiles) {
        if(!chunkFiles.length) {
            writeStream.end();
            return false;
        };
        const readChunkPath = path.resolve(UPLOAD_DIR, fileName, chunkFiles.shift());
        const readStream = fsextra.createReadStream(readChunkPath);
        readStream.pipe(writeStream, {
            end: false
        });
        readStream.on('end', () => {
            pipeFile(chunkFiles, writeStream)
        });
        readStream.on('error', (err) => {
            if(err) throw err;
            writeStream.close();
        });
    }
};

module.exports = {
    parse,
    receiveFileData,
    mergeChunk,
}