import { createApp } from 'vue'
import App from './App.vue'
import {goodsApiStorage} from "@/logicStorage/dataStorage";

goodsApiStorage().then();
createApp(App).mount('#app');