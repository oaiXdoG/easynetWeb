import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';
import router from './router';
import './styles/global.css';

const app = createApp(App);
const pinia = createPinia();

// register all Element Plus icons globally for convenience
Object.entries(ElementPlusIconsVue).forEach(([name, component]) => {
  app.component(name, component);
});

app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount('#app');
