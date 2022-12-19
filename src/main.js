import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faPencil, faPlus, faRightFromBracket, faTrash, faVideo } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash,faPencil,faPlus,faRightFromBracket,faVideo);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
