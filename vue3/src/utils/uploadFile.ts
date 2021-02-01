const REQUEST_URL = 'http://localhost:3000'; // 访问服务器地址3000
export const SIZE = 10 * 1024 * 1024; // 文件大小为10M
import { request } from './request';
import { inject } from 'vue';

/*inject*/
export const getMainWorker = () => {
    return inject('$worker');
};

// upload.vue 调用该函数,对文件进行切片,并用hash命名,返回chunklist
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

// 文件切割功能，切割上面的函数逻辑
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

// upload all the chunks to server
export const uploadChunks = async (file, chunkLists, fileDirHash, xhrLists) => {
    const chunkListsWidthHash = chunkLists;
    const requestLists = createRequestLists(chunkListsWidthHash, file, xhrLists);
    await Promise.all(requestLists);
    notifyMegeChunk(file, fileDirHash)
}

export const createRequestLists = (chunkListsWidthHash, file, xhrLists) => {
    const { name } = file;
    const requestFormDataArray = chunkListsWidthHash.map(({ chunk, hash, fileHash, fileDirHash }) => {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('hash', hash);
        formData.append('filename', name);
        formData.append('fileHash', fileHash);
        formData.append('fileDirHash', fileDirHash);
        return { formData };
    });

    return requestFormDataArray.map(({ formData }, index) => {
        return  request({
            url: `${REQUEST_URL}/upload`,
            data: formData,
            // onprogress: function(response) {
            //     const currentChunk = chunkListsWidthHash[index];
            //     const { loaded, total } = response;
            //     currentChunk.percent = currentChunk.percent > (loaded / total)? currentChunk.percent:(loaded / total);
            // },
            xhrLists
        });
    });
}

export const notifyMegeChunk = async (file, fileDirHash) => {
    const { size, name} = file;
    request({
        url: `${REQUEST_URL}/merge`,
        headers:{
            "content-type": "application/json",
        },
        data: JSON.stringify({
            filesize: size,
            filename: name,
            fileDirHash,
        })
    });
}













//////////////////////////////////////////////////////////////////////////
// export const noop = function () {

// };
// export const request = ({ url, method = 'post', data, headers = {}, onprogress = noop, xhrLists = []}) => {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.upload.onprogress = onprogress;
//         xhr.open(method, url);
//         Object.keys(headers).forEach(item => {
//             xhr.setRequestHeader(item, headers[item]);
//         });
//         xhr.send(data);
//         xhr.onreadystatechange = (res) => {
//             const { readyState, status  } = xhr;
//             if (readyState === 4 && status === 200) {
//                 resolve(res);  
//                 // resolve(res.target.response);
//             }
//             if (xhrLists.length) {
//                 const xhrIndex = xhrLists.findIndex(item => item === xhr);
//                 xhrLists.splice(xhrIndex, 1);
//             }
//         };
//         xhrLists.push(xhr) // 把所有xhr放入到xhrList
//     })
// };



