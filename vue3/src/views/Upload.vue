<template>
    <div class="upload">
      <p>hello</p>
        <h1>upload component:</h1>
        <input type="file" placeholder="please choose a file" @change="handlechange($event)">
        <button @click="bntButtonClick">submit</button>
        <button @click="bntButtonMerge">Merge</button>
    </div>
</template>

<script>
import { onMounted, reactive, ref, computed, watch, inject, toRaw } from 'vue';
import { 
  createChunkListWithHash, 
  uploadChunks,
  // getMainWorker,
  notifyMegeChunk,
} from '../utils/uploadFile';

export default {
  name: 'upload',
  setup() {
    const state = reactive({
      file: [], // file info
      chunkLists: [], // file chunk list
      // fileSliceProgress: 0,
      fileChunks: [],
      fileDirHash: null,
      xhrLists: [],
      // isExist: false,
      // isPaused: false
    });

    // const mainWorker = getMainWorker();
    
    const handlechange = (e) => {
      const [file] = e.target.files;
      state.file = file;
      let name = file.name.substring(0, file.name.lastIndexOf("."));
      state.fileDirHash = name;
      // 对文件进行切片
      state.chunkLists = createChunkListWithHash(file);
      // console.log(state.chunkLists);

      state.fileChunks = state.chunkLists.map((file, index) => {
        return Object.assign(file, {fileHash: `${file.hash}`, fileDirHash: name})
      });

      // mainWorker.startWork(file, toRaw(state.fileChunks));
      // mainWorker.addEventListener('message', (event) => {
      //   alert('finished')
      //   console.log(event);
      //   const {data} = event;
      //   const {method, hash} = data;
      //   if (method === 'FinishFileSlice') {
      //       state.fileChunks = state.fileChunks.map((file, index) => {
      //           return Object.assign(file, { fileHash: `${hash}-${index}`, fileDirHash: hash});
      //       });
      //       state.fileSliceProgress = 100;
      //       state.fileDirHash = hash;
      //   } else if (method === 'DoingFileSlice') { // 正在切片用于显示progress
      //       const { progress } = data;
      //       state.fileSliceProgress = parseFloat(progress);
      //   }
      // })
      // console.log(`after select file, the state value is`, state);
    };

    // bntButtonClick 提交处理事件
    const bntButtonClick = async () => {
      // 上传文件处理函数
      await uploadChunks(state.file, state.fileChunks, state.fileDirHash, state.xhrLists);
    };

    const bntButtonMerge = async () => {
      await notifyMegeChunk(state.file, state.fileDirHash)
    }
    // DOM 首次加载之后，可以获取DOM元素的引用
    onMounted(() => {
      console.log('onmounted');
    });
    return {
      handlechange,
      bntButtonClick,
      bntButtonMerge,
    };
  },
};
</script>

<style lang="css" scoped>
.upload {
    display: inline-block;
    background: #8c97c4;
    color: aliceblue;
    padding: 5px;
    outline: none;
    border: none;
}

</style>
