import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApiService from "./plugins/api";

// FONT AWESOME
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// library.add(faUserSecret);

createApp(App).use(router).use(ApiService).use(store).mount("#app"); //.component("font-awesome-icon", FontAwesomeIcon)

import "bootstrap/dist/js/bootstrap.js";
