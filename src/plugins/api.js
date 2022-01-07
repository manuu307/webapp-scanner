import _axios from '@/services/axios'

const ApiService = {
	install: function (Vue) {
		Vue.$api = _axios
	},
}

export default ApiService
