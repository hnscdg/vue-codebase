<template>
    <div class="upload">
        <h1>choose a file:</h1>
        <button @click="bntClick">choose file</button>
        <input type="file" placeholder="please choose a file">
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'upload',
  setup() {
    const fileSelector = ref(null);
    const bntClick = () => {
      alert('click');
      console.log(fileSelector.value);
    };
    return {
      fileSelector,
      bntClick,
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
