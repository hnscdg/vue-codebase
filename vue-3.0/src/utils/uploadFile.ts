import { ajax } from './ajax';
const SIZE = 10 * 1024 * 1024; // 文件大小为10M
const REQUEST_URL = 'http://localhost:3000/upload'; // 访问服务器地址3000

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

export const createChunkListWithHash = (file: any) => {
    const { name } = file;
    // 文件分片
    const fileChunkLists = createFileChunk(file);
    console.log(fileChunkLists.length)

    ajax({
        type: 'POST',
        url: REQUEST_URL,
        dataType: 'json',
        data: fileChunkLists.toString(),
    });

    return fileChunkLists.map(({ file }, index) => {
        return {
            chunk: file
        };
    });
}