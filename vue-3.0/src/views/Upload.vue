<template>
    <div class="upload">
      <p ref="pvalue">hello</p>
        <h1>choose a file:</h1>
        <input type="file" placeholder="please choose a file" ref="file" @change="bntClick">
        <button @click="bntButtonClick">submit</button>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'upload',
  setup() {
    // 创建DOM引用
    const file = ref(null);
    const pvalue = ref(null);

    const bntClick = (e) => {
      console.log(e);
    };

    const bntButtonClick = (e) => {
      console.log(e);
    };

    // DOM 首次加载之后，可以获取DOM元素的引用
    onMounted(() => {
      console.log(file.value.type);
      file.value.style.color = 'red';
      console.log(pvalue.value);
    });

    return {
      file,
      pvalue,
      bntClick,
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
