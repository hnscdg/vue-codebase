//例子：原生封装ajax
//$.ajax({
//	type:"GET",
//	url:"test.json",
//	data:{user:$("#username").val(),content:$("#content").val()},
//	dataType:"json"
//})

interface Config {
    type: string;
    url: string;
    data?: string;
    dataType: string;
}

export function ajax(config: Config) {
    let xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true) // async
    xhr.send(config.data);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
            if(config.dataType == 'json') {
                // console.log(xhr.responseText)
            }else {
                // console.log(xhr.responseText)
            }
        }
    }
}