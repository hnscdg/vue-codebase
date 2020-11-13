<template>
    <div class="test">
        <h1>vue 3.0 experience </h1>
        <h1>test count: {{count}}</h1>
        <div>count * 2 = {{doubleCount}}</div>
        <div>state from vuex {{a}}</div>
        <button @click="add">Add</button>
        <button @click="update">update a</button>
    </div>
</template>

<script>
import { computed, ref, getCurrentInstance } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const add = () => {
      // eslint-disable-next-line no-plusplus
      count.value++;
    };
    // watch(count.value, (val => {
    //   console.log(`count is ${val}`);
    // }));
    const doubleCount = computed(() => count.value * 2);

    const { ctx } = getCurrentInstance();
    console.log(ctx.$router.currentRoute.value.path);
    const a = computed(() => ctx.$store.state.test.a);
    const update = () => {
      ctx.$store.commit('setTestA', count);
    };
    return {
      count,
      add,
      doubleCount,
      a,
      update,
    };
  },
};
</script>

<style lang="less" scoped>
.test {
    color: red;
}
</style>
