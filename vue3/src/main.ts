import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import worker from './utils/worker/mainWorker';

const app = createApp(App);

app.provide('$worker', worker);

app.use(store);

app.use(router);

app.mount('#app');
