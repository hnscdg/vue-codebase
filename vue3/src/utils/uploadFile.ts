import { ajax } from './ajax';
import { request } from './request';
const REQUEST_URL = 'http://localhost:3000/upload'; // 访问服务器地址3000
export const SIZE = 10 * 1024 * 1024; // 文件大小为10M

//对文件进行切片，并用hash命名
export const createChunkListWithHash = (file: any) => {
    const { name } = file;
    // 文件分片
    const fileChunkLists = createFileChunk(file);

    return fileChunkLists.map(({ file }, index ) => {
        return {
            chunk: file,
            hash: `${name} - ${index}`,
            precent: 0
        }
    });

}

export const createFileChunk = (file: any, size = SIZE) => {
    const fileChunkLists = [];
    let cur = 0;
    // 利用递归，切取文件大小为10M
    while (cur < file.size) {
        fileChunkLists.push({
            file: file.slice(cur, cur + size),
        });
        cur += size;
    }
    return fileChunkLists;
};


export const uploadChunks = async (file, chunkLists, fileDirHash, xhrLists) => {
    const chunkListsWidthHash = chunkLists;
    const requestLists = createRequestLists(chunkListsWidthHash, file, xhrLists);
    await Promise.all(requestLists);
    // notifyMegeChunk(file, fileDirHash)
}

export const createRequestLists = (chunkListsWidthHash, file, xhrLists) => {
    const { name } = file;
    const requestFormDataArray = chunkListsWidthHash.map(({ chunk, hash, fileHash, fileDirHash }) => {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('filename', name);
        formData.append('fileHash', fileHash);
        formData.append('fileDirHash', fileDirHash);
        return { formData };
    })
    return requestFormDataArray.map(({ formData }, index) => {
        return  request({
            url: REQUEST_URL,
            data: formData,
            // onprogress: function(response) {
            //     const currentChunk = chunkListsWidthHash[index];
            //     const { loaded, total } = response;
            //     currentChunk.percent = currentChunk.percent > (loaded / total)? currentChunk.percent:(loaded / total);
            // },
            xhrLists
        });
        // console.log(requestFormDataArray);
        // console.log(formData);
    //     return request({
    //         url: REQUEST_URL,
    //         method: 'post',
    //         data: formData,
    //         // onprogress: function(response) {
    //         //     const currentChunk = chunkListsWidthHash[index];
    //         //     const { loaded, total } = response;
    //         //     // currentChunk.percent = currentChunk.percent > (loaded / total) ? currentChunk.percent : (loaded / total); // 原来是否有已经上传的部分;
    //         // },
    //         xhrLists
    //     })
    });
}