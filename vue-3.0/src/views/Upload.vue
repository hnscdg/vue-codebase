<template>
    <div class="upload">
      <p>hello</p>
        <h1>choose a file:</h1>
        <input type="file" placeholder="please choose a file" @change="handlechange">
        <button @click="bntButtonClick">submit</button>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import { createChunkListWithHash } from '../utils/uploadFile';

export default {
  name: 'upload',
  setup() {
    const state = reactive({
      file: [],
      fileChunks: [],
    });
    const handlechange = (e) => {
      const [file] = e.target.files;
      state.file = file;
    };
    const bntButtonClick = (e) => {
      const temp = createChunkListWithHash(state.file);
      // console.log(temp);
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
