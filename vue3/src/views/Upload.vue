<template>
    <div class="upload">
      <p>hello</p>
        <h1>choose a file:</h1>
        <input type="file" placeholder="please choose a file" @change="handlechange">
        <button @click="bntButtonClick">submit</button>
    </div>
</template>

<script>
import { onMounted, reactive, ref, computed, watch, inject, toRaw } from 'vue';
import { 
  createChunkListWithHash, 
  uploadChunks,
  SIZE
} from '../utils/uploadFile';

export default {
  name: 'upload',
  setup() {
    const state = reactive({
      file: [],
      chunkLists: [],
      fileChunks: [],
      fileDirHash: null,
      xhrLists: []
    });
    
    const handlechange = (e) => {
      const [file] = e.target.files;
      state.file = file;

      // 对文件进行切片
      state.chunkLists = createChunkListWithHash(file);
    };
    const bntButtonClick = async () => {

      // 上传文件处理函数
      await uploadChunks(state.file, state.chunkLists);

    };
    // DOM 首次加载之后，可以获取DOM元素的引用
    onMounted(() => {
      console.log('onmounted');
    });
    return {
      handlechange,
      bntButtonClick,
    };
  },
};
</script>

<style lang="css" scoped>
.upload {
    display: inline-block;
    background: #4e6ef2;
    color: aliceblue;
    padding: 5px;
    outline: none;
    border: none;
}

</style>
