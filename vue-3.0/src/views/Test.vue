<template>
    <div class="test">
        <h1>vue 3.0 experience </h1>
        <h1>test count: {{count}}</h1>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    return { count };
  },
};
</script>

<style lang="less" scoped>
.test {
    color: red;
}
</style>
