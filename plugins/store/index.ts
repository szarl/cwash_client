import { store } from './storeHelper';
// import { UserStore } from './user/userStore';

const storeInstance = store.createStore();
export default () => storeInstance;

defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(storeInstance);
})

// export const userStore = require('~/server/store/user/userStore').userStore as UserStore;
