import { createApp } from 'vue'
import App from './App.vue'
import {goodsApiStorage} from "@/logicStorage/DataStorage";

goodsApiStorage().then();
createApp(App).mount('#app');