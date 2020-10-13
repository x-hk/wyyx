import Vue from "vue";
import Vuex from 'vuex';
import {
	addShopCar,
	getShopCar,
	delGoodsData,
	changeCheckedData,
	changeAllCheckedData,
	addNumberData,
	cutNumberData,
	changeFavoriteData
} from "../static/api/index.js";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		carData: [],
	},
	mutations: {
		addCar(state, message) {
			state.carData = message
		},
		changeChecked(state, message) {
			state.carData = message
		},
		changeAllChecked(state, message) {
			state.carData = message
		},
		addNumber(state, message) {
			state.carData = message
		},
		cutNumber(state, message) {
			state.carData = message
		},
		delGoods(state,message) {
			state.carData = message;
		},
		flush(state, message) {
			if (!message) {
				message = [];
			}
			state.carData = message
		}
	},
	actions: {
		async asyncFlush(context) {
			var { message } = await getShopCar();
			context.commit('flush', message)
		},
		async asyncAddCar(context, goods) {
			await addShopCar(goods);
			var { message } = await getShopCar();
			context.commit('addCar', message)
		},
		async asyncDelGoods(context, ids) {
			await delGoodsData(ids);
			var { message } = await getShopCar();
			context.commit('delGoods', message)
		},
		async asyncChangeChecked(context, id) {
			await changeCheckedData(id)
			var { message } = await getShopCar();
			context.commit('changeChecked', message)
		},
		async asyncChangeAllChecked(context,flag){
			await changeAllCheckedData(flag);
			var { message } = await getShopCar();
			context.commit('changeAllChecked', message)
		},
		async asyncAddNumber(context,id){
			await addNumberData(id);
			var { message } = await getShopCar();
			context.commit('addNumber', message)
		},
		async asyncCutNumber(context,id){
			await cutNumberData(id);
			var { message } = await getShopCar();
			context.commit('cutNumber', message)
		},
		async asyncChangeFavorite(context,id){
			await changeFavoriteData(id);
		}
	},
	getters: {
		getTotalCount(state, mutations) {
			let total = 0;
			state.carData.map(m => {
				total += m.number;
			})
			return total;
		},
		getCheckCount(state) {
			let checkCount = 0;
			state.carData.map(m => {
				if (m.checked == true) {
					checkCount += m.number;
				}
			})
			return checkCount;
		},
		getTotalPrice(state) {
			let totalPrice = 0;
			state.carData.map(m => {
				if (m.checked == true) {
					totalPrice += m.number * m.price
				}
			})
			return totalPrice;
		},
	},
})
export default store
