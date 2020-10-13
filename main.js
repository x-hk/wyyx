import Vue from 'vue'
import App from './App'
import store from "./store/carData.js"

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
