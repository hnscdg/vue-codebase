// export const noop = function() {}


export const request = ({
    url,
    method = 'post',
    data,
    headers = {},
    // onprogress = noop,
    xhrLists = []
}) => {
    return new Promise((resolve, reject) => {
        // initialize a new XMLHTTPRequest
        const xhr = new XMLHttpRequest();

        // xhr.upload.onprogress = onprogress;

        xhr.open(method, url);

        Object.keys(headers).forEach(item => {
            xhr.setRequestHeader(item, headers[item]);
        });

        xhr.send(data);

        xhr.onreadystatechange = (res) => {
            const { readyState, status } = xhr;
            if(readyState === 4 && status === 200){
                resolve(res.target);
            }
            // if(xhrLists.length){
            //     const xhrIndex = xhrLists.findIndex(item => item === xhr);
            //     xhrLists.splice(xhrIndex, 1)
            // }
        }
        xhrLists.push(xhr);
    });
};