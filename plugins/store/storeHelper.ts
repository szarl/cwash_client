import Vuex, { Store, StoreOptions } from 'vuex';
import { VuexModule } from 'vuex-module-decorators';
import type { Plugin } from 'vuex';

export const store = new class StoreHelper {
    private store!: Store<any>;

    get storeInstance(): Store<any> {
        return this.store;
    }

    createStore(plugins: Plugin<VuexModule>[] = []) {
        if (this.store) {
            console.warn('Store were initialized.');
            return this.store;
        }

        const storeConfig: StoreOptions<any> = {
            plugins,
        };

        this.store = new Vuex.Store(storeConfig);
        return this.store;
    }
};
