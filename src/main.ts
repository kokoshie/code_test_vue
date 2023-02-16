import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import '@fortawesome/fontawesome-free/css/all.min.css'

import "datatables.net-bs5"
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css"
import "jszip"
import "pdfmake"
import "datatables.net-buttons-bs5/js/buttons.bootstrap5"
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css"
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"

import '../src/assets/css/style.css'




// import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';


createApp(App).use(store).use(router).mount('#app')
